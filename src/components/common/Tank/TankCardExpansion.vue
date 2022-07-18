<template>
  <v-expansion-panels>
    <v-expansion-panel bg-color="violet" style="border-radius: 10px !important">
      <v-expansion-panel-title :class="tankCardTitleClasses">
        <component
          :is="tankCardTitleTag"
          v-text="tank.mainTankInformation.name"
        />
      </v-expansion-panel-title>
      <v-expansion-panel-text tag="article" class="d-flex flex-column">
        <v-container>
          <v-row>
            <v-col
              cols="12"
              lg="6"
              v-for="(componentConfig, index) in createTankCardDisplays(tank)"
              :key="index"
            >
              <component
                :is="componentConfig.component"
                v-bind="componentConfig.attrs"
                class="radius-4 pa-2 d-flex align-center justify-center shadow-bg"
              ></component>
            </v-col>
          </v-row>
          <slot />
        </v-container>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>
<script setup lang="ts">
import { TankDto } from "@/types/Tank";
import LivestockWeightDisplay from "@/components/common/Tank/TankBasicInfoDisplays/LivestockWeightDisplay.vue";
import MainSpecieDisplay from "@/components/common/Tank/TankBasicInfoDisplays/MainSpecieDisplay.vue";
import IconDisplay from "./TankBasicInfoDisplays/base/IconDisplay.vue";
import CurrentFeedDisplay from "@/components/common/Tank/TankBasicInfoDisplays/CurrentFeedDisplay.vue";
import { TankCardExpansionConfig } from "@/types/TankCardExpansionConfig";
import { calcLivestockWeight } from "@/helpers/calcLivestockWeight";
import BaseDisplay from "./TankBasicInfoDisplays/base/BaseDisplay.vue";
withDefaults(
  defineProps<{
    tank: TankDto;
    tankCardTitleTag?: string;
    tankCardTitleClasses?: string;
  }>(),
  {
    tankCardTitleTag: "h4",
  }
);

function createTankCardDisplays(tank: TankDto): TankCardExpansionConfig[] {
  const basicInformation: TankCardExpansionConfig[] = [
    {
      component: BaseDisplay,
      attrs: {
        keypath: "tankCard.volume",
        spanValue: `${tank.mainTankInformation.volume} 	\u33A5`,
        templateName: "volume",
      },
    },
    {
      component: LivestockWeightDisplay,
      attrs: {
        livestockWeight:
          // current weight || initial weight || no livestock is set
          calcLivestockWeight(tank.livestockInformation.current) || null,
      },
    },
    {
      component: IconDisplay,
      attrs: {
        keypath: "tankCard.feedProgram",
        boolean: !!tank.feedInformation?.currentFeed,
        templateName: "feedProgram",
      },
    },
    {
      component: BaseDisplay,
      attrs: {
        keypath: "tankCard.annotations",
        spanValue: tank.annotations.length.toString(),
        templateName: "annotations",
      },
    },
  ];

  return addAdditionInformation(basicInformation, tank);
}

function addAdditionInformation(
  basicInformationConfig: TankCardExpansionConfig[],
  tank: TankDto
): TankCardExpansionConfig[] {
  if (tank.feedInformation?.currentFeed) {
    const { size, feed } = tank.feedInformation.currentFeed.feedForSpecie;
    basicInformationConfig.push({
      component: CurrentFeedDisplay,
      attrs: {
        feed,
        size,
      },
    });
  }
  if (tank.livestockInformation?.current.length) {
    basicInformationConfig.push({
      component: MainSpecieDisplay,
      attrs: {
        livestock: tank.livestockInformation.current,
      },
    });
  }
  return basicInformationConfig;
}
</script>
