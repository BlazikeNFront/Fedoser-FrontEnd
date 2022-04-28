<template>
  <v-container>
    <v-row
      ><v-col cols="12" lg="6"> <date-display :date="note.date" /></v-col>
      <v-col cols="12" lg="6">
        <note-title-display :title="note.title"
      /></v-col>
      <v-col cols="12" lg="6">
        <important-display :is-important="note.isImportant"
      /></v-col>
      <v-col cols="12" v-if="note.enviromentalData">
        <enviromental-data-display
          tag="h4"
          :enviromental-data="note.enviromentalData"
        />
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup lang="ts">
import DateDisplay from "@/components/common/TankBasicInfoDisplays/DateDisplay.vue";
import NoteTitleDisplay from "@/components/common/TankBasicInfoDisplays/NoteTitleDisplay.vue";
import ImportantDisplay from "@/components/common/TankBasicInfoDisplays/ImportantDisplay.vue";
import EnviromentalDataDisplay from "@/components/common/TankBasicInfoDisplays/EnviromentalDataDisplay.vue";
import { TankNote } from "@/types/TankAnnotation";

defineProps<{
  note: TankNote;
}>();
</script>
