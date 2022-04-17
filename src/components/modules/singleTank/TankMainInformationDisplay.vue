<template>
  <div
    class="d-flex flex-column"
    style="padding: 10px 15px; border: 1px dotted darkblue"
  >
    <div class="summary_control">
      <p style="font-size: 1.5rem">
        <span class="f-bold">Tank name:</span>{{ mainTankInformation.name }}
      </p>
    </div>
    <div class="summary_control">
      <p style="font-size: 1.5rem">
        <span class="f-bold">Tank volume:</span>{{ mainTankInformation.volume }}
      </p>
    </div>
    <div class="summary_control">
      <p style="font-size: 1.5rem">
        <span class="f-bold">Tank description:</span
        >{{ mainTankInformation.description }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { MainTankInformation } from "@/types/MainTankInformation";

defineProps<{
  mainTankInformation: MainTankInformation;
}>();
</script>

<style></style>
