<template>
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
              class="radius-4 pa-2 d-flex align-center justify-center shadow-bg"
              :is="componentConfig.component"
              v-bind="componentConfig.attrs"
            ></component>
          </v-col>
        </v-row>
        <slot />
      </v-container>
    </v-expansion-panel-text>
  </v-expansion-panel>
</template>
<script setup lang="ts">
import { Tank } from "@/types/Tank";
import LivestockWeightDisplay from "@/components/common/TankBasicInfoDisplays/LivestockWeightDisplay.vue";
import MainSpecieDisplay from "@/components/common/TankBasicInfoDisplays/MainSpecieDisplay.vue";
import FeedProgramDisplay from "@/components/common/TankBasicInfoDisplays/FeedProgramDisplay.vue";
import CurrentFeedDisplay from "@/components/common/TankBasicInfoDisplays/CurrentFeedDisplay.vue";
import TankVolumeDisplay from "@/components/common/TankBasicInfoDisplays/TankVolumeDisplay.vue";
import AnnotationsDisplay from "@/components/common/TankBasicInfoDisplays/AnnotationsDisplay.vue";
import { TankCardExpansionConfig } from "@/types/TankCardExpansionConfig";
import { findMainSpecieInLivestock } from "@/helpers/findMainSpecieInLivestock";

withDefaults(
  defineProps<{
    tank: Tank;
    tankCardTitleTag?: string;
    tankCardTitleClasses?: string;
  }>(),
  {
    tankCardTitleTag: "h4",
  }
);

function createTankCardDisplays(tank: Tank): TankCardExpansionConfig[] {
  const basicInformation: TankCardExpansionConfig[] = [
    {
      component: TankVolumeDisplay,
      attrs: { volume: tank.mainTankInformation.volume },
    },
    {
      component: LivestockWeightDisplay,
      attrs: {
        livestockWeight:
          // current weight || initial weight || no livestock is set
          tank.feedInformation?.currentLivestockWeight ||
          tank.livestockInformation?.initialLivestockWeight ||
          null,
      },
    },
    {
      component: FeedProgramDisplay,
      attrs: {
        isFeedProgramSet: !!tank.feedInformation?.currentFeed,
      },
    },
    {
      component: AnnotationsDisplay,
      attrs: { annotationNumber: tank.annotations.length },
    },
  ];

  return addAdditionInformation(basicInformation, tank);
}

function addAdditionInformation(
  basicInformationConfig: TankCardExpansionConfig[],
  tank: Tank
): TankCardExpansionConfig[] {
  if (tank.feedInformation?.currentFeed) {
    basicInformationConfig.push({
      component: CurrentFeedDisplay,
      attrs: { feed: tank.feedInformation.currentFeed },
    });
  }
  if (tank.livestockInformation?.livestock.length) {
    basicInformationConfig.push({
      component: MainSpecieDisplay,
      attrs: {
        mainSpecie: findMainSpecieInLivestock(
          tank.livestockInformation?.livestock
        ).name,
      },
    });
  }
  return basicInformationConfig;
}
</script>
