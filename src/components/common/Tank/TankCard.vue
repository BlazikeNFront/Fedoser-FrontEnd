<template>
  <v-card :tag="tag" class="px-3 py-2 d-flex flex-column" color="violet">
    <v-container>
      <v-row>
        <v-col cols="12">
          <component
            :is="tankCardTitleTag"
            v-text="tank.mainTankInformation.name"
        /></v-col>
      </v-row>
    </v-container>

    <div>
      <div class="d-flex flex-column tank-card__section">
        <p>Livestock</p>
        <h5>
          {{ tank.livestockInformation?.initialLivestockWeight || "mdi-close" }}
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
  </v-card>
</template>
<script setup lang="ts">
import { Tank } from "@/types/Tank";
import { onMounted, getCurrentInstance } from "vue";
withDefaults(
  defineProps<{
    tank: Tank;
    tag?: string;
    tankCardTitleTag?: string;
  }>(),
  {
    tag: "div",
    tankCardTitleTag: "p",
  }
);
onMounted(() => {
  const instance = getCurrentInstance();
  console.log(instance);
});
</script>
