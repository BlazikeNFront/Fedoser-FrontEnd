<template>
  <v-container>
    <v-row>
      <v-col cols="12" lg="6">
        <date-display
          :date="note.date"
          class="shadow-bg f-15 text-white py-2 radius-4"
      /></v-col>
      <v-col cols="12" lg="6">
        <note-title-display
          :title="note.title"
          class="shadow-bg f-15 text-white py-2 radius-4"
      /></v-col>

      <v-col cols="12" lg="6" v-if="note.description">
        <description-display
          :description="note.description"
          class="shadow-bg f-15 text-white py-2 radius-4"
      /></v-col>
      <v-col cols="12" lg="6">
        <important-display
          class="shadow-bg f-15 text-white py-2 radius-4"
          :is-important="note.isImportant"
      /></v-col>
      <v-col cols="12" v-if="note.enviromentalData">
        <enviromental-data-display
          header-tag="h4"
          :header-attrs="{
            class: 'text-h4 font-weight-bold text-center',
          }"
          :enviromental-data="note.enviromentalData"
        />
      </v-col>
      <slot />
    </v-row>
  </v-container>
</template>
<script setup lang="ts">
import DateDisplay from "@/components/common/TankBasicInfoDisplays/DateDisplay.vue";
import NoteTitleDisplay from "@/components/common/TankBasicInfoDisplays/NoteTitleDisplay.vue";
import ImportantDisplay from "@/components/common/TankBasicInfoDisplays/ImportantDisplay.vue";
import EnviromentalDataDisplay from "@/components/common/TankBasicInfoDisplays/EnviromentalDataDisplay.vue";
import DescriptionDisplay from "@/components/common/TankBasicInfoDisplays/DescriptionDisplay.vue";
import { TankNote } from "@/types/TankAnnotation";

defineProps<{
  note: TankNote;
}>();
</script>
