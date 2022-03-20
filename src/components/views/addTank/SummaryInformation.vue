<template>
  <h3 class="text-center">Summary</h3>
  <div class="d-flex">
    <div class="d-flex flex-column">
      <h4 style="font-size: 2rem; margin: 1.5rem 2rem">
        Main Tank Information
      </h4>
      <div class="d-flex flex-column">
        <div class="summary_control">
          <p style="font-size: 1.5rem">
            <span class="f-bold">Tank name:</span>{{ mainTankInformation.name }}
          </p>
        </div>
        <div class="summary_control">
          <p style="font-size: 1.5rem">
            <span class="f-bold">Tank volume:</span
            >{{ mainTankInformation.volume }}
          </p>
        </div>
        <div class="summary_control">
          <p style="font-size: 1.5rem">
            <span class="f-bold">Tank description:</span
            >{{ mainTankInformation.description }}
          </p>
        </div>
      </div>
      <div
        class="d-flex flex-column"
        style="border-top: 2px solid blue; padding-top: 2rem"
      >
        <livestock-list
          v-if="props.livestockInformation.livestock.length"
          :livestock-information="props.livestockInformation"
        />
      </div>
      <div
        v-if="feedInformation.currentFeed"
        class="d-flex flex-column"
        style="margin-top: 2rem; border: 2px solid green; padding-top: 2rem"
      >
        <feed-display :feed="feedInformation.currentFeed" />
        <p>FEED PROGRAM HAS BEEN SET</p>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import LivestockList from "@/components/common/Livestock/LivestockList.vue";
import FeedDisplay from "@/components/common/Feed/FeedDisplay.vue";
import { MainTankInformation } from "@/types/MainTankInformation";
import { LivestockInformation } from "@/types/Livestock";
import { FeedInformation } from "@/types/FeedInfomation";
import { onMounted } from "@vue/runtime-core";

const props = defineProps<{
  mainTankInformation: MainTankInformation;
  livestockInformation: LivestockInformation;
  feedInformation: FeedInformation;
}>();
onMounted(() => console.log(props.feedInformation));
</script>
<style scoped></style>
