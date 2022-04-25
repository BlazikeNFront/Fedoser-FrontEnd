<template>
  <v-expansion-panel bg-color="violet" style="border-radius: 10px !important">
    <v-expansion-panel-title class="text-h4 text-center">
      <h4 v-text="note.title" />
    </v-expansion-panel-title>
    <v-expansion-panel-text tag="article" class="d-flex flex-column">
      <note-display :note="note" />
    </v-expansion-panel-text>
  </v-expansion-panel>
</template>
<script setup lang="ts">
import { TankAnnotation } from "@/types/TankAnnotation";
import NoteDisplay from "@/components/common/Displays/NoteDisplay.vue";

defineProps<{
  note: TankAnnotation;
}>();
</script>
