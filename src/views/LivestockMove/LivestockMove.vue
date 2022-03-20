<template>
  <div class="d-flex flex-column">
    <router-link :to="{ name: RoutesNames.HOME }"
      ><button>Back</button></router-link
    >
    <h2>Livestock move</h2>
    <div v-if="tab === 0">
      <tanks-select />
    </div>
    <div v-else-if="tab === 1">
      <livestock-select />
    </div>
    <div v-else>
      <livestock-move-summary />
    </div>
    <div class="d-flex">
      <button class="button" v-if="tab > 0" @click="tab--">
        Previous step
      </button>
      <button class="button" v-if="tab < 2" @click="tab++">Next step</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import TanksSelect from "@/components/views/livestockMove/TanksSelect.vue";
import LivestockSelect from "@/components/views/livestockMove/LivestockSelect.vue";
import LivestockMoveSummary from "@/components/views/livestockMove/LivestockMoveSummary.vue";
import { RoutesNames } from "@/constants/routesNames/RoutesNames";
import { ref } from "vue";
const tab = ref(0);
</script>

<style></style>
