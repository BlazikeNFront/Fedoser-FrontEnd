<template>
  <v-container>
    <v-row
      ><v-col cols="12" lg="6"> <date-display :date="note.date" /></v-col>
      <v-col cols="12" lg="6"> <title-display :title="note.title" /></v-col>
      <v-col cols="12" lg="6">
        <important-display :is-important="note.isImportant"
      /></v-col>
    </v-row>
  </v-container>
</template>
<script setup lang="ts">
import DateDisplay from "@/components/common/TankBasicInfoDisplays/DateDisplay.vue";
import TitleDisplay from "@/components/common/TankBasicInfoDisplays/TitleDisplay.vue";
import ImportantDisplay from "@/components/common/TankBasicInfoDisplays/ImportantDisplay.vue";
import { TankAnnotation } from "@/types/TankAnnotation";

defineProps<{
  note: TankAnnotation;
}>();
</script>
