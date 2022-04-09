<template>
  <v-expansion-panel bg-color="violet" style="border-radius: 10px !important">
    <v-expansion-panel-title :class="tankCardTitleClasses">
      <component
        :is="tankCardTitleTag"
        v-text="tank.mainTankInformation.name"
      />
    </v-expansion-panel-title>
    <v-expansion-panel-text tag="article" class="d-flex flex-column">
      <livestock-weight
        class="d-flex align-center justify-center f-2"
        :livestock-weight="
          // current weight || initial weight
          tank.feedInformation?.currentLivestockWeight ||
          tank.livestockInformation?.initialLivestockWeight ||
          null
        "
      />
      <feed-program
        class="d-flex align-center justify-center f-2"
        :is-feed-program-set="!!tank.feedInformation?.currentFeed"
      />
      <!-- <i18n-t
        keypath="tankCard.livestock"
        tag="p"
        class="d-flex align-center justify-center f-2"
        scope="global"
      >
        <template #livestock>
          <span class="mr-2">: </span>
          <p
            v-if="tank.livestockInformation?.initialLivestockWeight"
            v-text="tank.livestockInformation.initialLivestockWeight"
          ></p>
          <v-icon v-else :icon="Icons.EXIT" />
        </template>
      </i18n-t> -->
      <!-- <i18n-t
        keypath="tankCard.mainSpecie"
        tag="p"
        class="d-flex align-center justify-center f-2"
        scope="global"
      >
        <template #mainSpecie>
          <span class="mr-2">: </span>
          <span v-text="tank.annotations.length"> </span>
        </template>
      </i18n-t>
      <i18n-t
        keypath="tankCard.feedProgram"
        tag="p"
        class="d-flex align-center justify-center f-2"
        scope="global"
      >
        <template #feedProgram>
          <span class="mr-2">: </span>
          <v-icon
            :icon="
              tank.feedInformation?.currentFeed
                ? Icons.CHECKMARK_CIRCLE
                : Icons.EXIT
            "
            :color="tank.feedInformation?.currentFeed ? 'success' : 'error'"
          />
        </template>
      </i18n-t>
      <i18n-t
        keypath="tankCard.annotations"
        tag="p"
        class="d-flex align-center justify-center f-2"
        scope="global"
      >
        <template #annotations>
          <span class="mr-2">: </span>
          <span v-text="tank.annotations.length"> </span>
        </template>
      </i18n-t> -->
    </v-expansion-panel-text>
  </v-expansion-panel>
</template>
<script setup lang="ts">
import { Tank } from "@/types/Tank";
import { Icons } from "@/constants/icons/MdiIcons";
import LivestockWeight from "@/components/common/TankBasicInfoDisplays/LivestockWeight.vue";
import MainSpecie from "@/components/common/TankBasicInfoDisplays/MainSpecie.vue";
import FeedProgram from "@/components/common/TankBasicInfoDisplays/FeedProgram.vue";
withDefaults(
  defineProps<{
    tank: Tank;
    tankCardTitleTag?: string;
    tankCardTitleClasses?: string;
  }>(),
  {
    tankCardTitleTag: "h1",
  }
);
</script>
