<template>
  <v-card tag="section" color="transparent" flat>
    <h3 class="h-3 text-center" v-text="$t('global.summary')"></h3>
    <v-container>
      <v-row
        ><v-col cols="12" lg="6">
          <h4
            class="h-4 text-center"
            v-text="$t('addTank.mainTankInformation')"
          ></h4>
          <main-tank-information-display
            :main-tank-information="mainTankInformation"
            :single-information-attrs="{
              class: 'py-4 my-2 radius-4 d-flex align-center justify-center',
            }"
          />
        </v-col>
        <v-col cols="12" lg="6">
          <h4
            class="h-4 text-center mb-4"
            v-text="$t('livestockInformation.addedLivestock')"
          ></h4>
          <livestock-list
            class="livestock-table"
            :livestock="livestockInformation.initial"
          />
        </v-col>
        <v-col cols="12">
          <h4
            class="h-4 text-center mb-4"
            v-text="$t('feedInformation.feedInformation')"
          ></h4>
          <feed-information-display
            :feed-information="feedInformation" /></v-col
      ></v-row>
    </v-container>
  </v-card>
</template>
<script setup lang="ts">
import MainTankInformationDisplay from "@/components/common/Tank/MainTankInformationDisplay.vue";
import LivestockList from "@/components/common/Livestock/LivestockList.vue";
import FeedInformationDisplay from "@/components/common/Feed/FeedInformationDisplay.vue";
import { MainTankInformation } from "@/types/Tank";
import { LivestockInformationDto } from "@/types/Livestock";
import { FeedInformationDto } from "@/types/Feed";

defineProps<{
  mainTankInformation: MainTankInformation;
  livestockInformation: LivestockInformationDto;
  feedInformation: FeedInformationDto;
}>();
</script>
<style lang="scss">
.livestock-table {
  .v-table {
    background-color: $shadow-color !important;
    color: var(--v-white-text);
    tr:hover {
      background-color: $shadow-color-hover !important;
    }
  }
}
</style>
