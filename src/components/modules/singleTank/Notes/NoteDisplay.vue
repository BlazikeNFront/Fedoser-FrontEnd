<template>
  <v-container>
    <v-row>
      <v-col cols="12" lg="12" v-if="note.description">
        <base-display
          :span-value="note.description"
          keypath="mainTankInformationDisplay.description"
          template-name="description"
          class="shadow-bg f-15 text-white py-2 radius-4"
      /></v-col>
      <v-col cols="12" lg="6">
        <icon-display
          :boolean="note.isImportant"
          keypath="notes.isImportant"
          template-name="icon"
          class="shadow-bg f-15 text-white py-2 radius-4"
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
import EnviromentalDataDisplay from "@/components/common/Tank/TankBasicInfoDisplays/EnviromentalDataDisplay.vue";
import BaseDisplay from "@/components/common/Tank/TankBasicInfoDisplays/base/BaseDisplay.vue";
import { NoteDto } from "@/types/Note";
import IconDisplay from "@/components/common/Tank/TankBasicInfoDisplays/base/IconDisplay.vue";

defineProps<{
  note: NoteDto;
}>();
</script>
