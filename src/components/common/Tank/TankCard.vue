<template>
  <div class="d-flex flex-column tank-card">
    <h4>{{ tank.mainTankInformation.name }}</h4>
    <div class="tank-card__sections-wrapper">
      <div class="d-flex flex-column tank-card__section">
        <p>Livestock</p>
        <h5>
          {{ tank.livestockInformation?.totalLivestockWeight || "mdi-close" }}
        </h5>
      </div>
      <div class="d-flex flex-column tank-card__section">
        <p>Feed program</p>
        <h5>
          {{ tank.feedInformation?.currentFeed ? "mdi-check" : "mdi-close" }}
        </h5>
      </div>
      <div class="d-flex flex-column tank-card__section">
        <p>Annotations</p>
        <h5>{{ tank.annotations.length }}</h5>
      </div>
      <slot />
    </div>
  </div>
</template>
<script setup lang="ts">
import { Tank } from "@/types/Tank";

defineProps<{
  tank: Tank;
}>();
</script>
<style lang="scss">
.tank-card {
  border-radius: 1.5rem;
  background-color: #47009e;
  & h4 {
    margin: 1rem 2rem;
  }
}
.tank-card__sections-wrapper {
  width: 100%;
}
.tank-card__section {
  border-top: 2px solid $tertiary-color;
  padding: 1rem 1.5rem;
}
</style>
