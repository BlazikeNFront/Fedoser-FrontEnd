<template>
  <v-expansion-panel bg-color="violet" style="border-radius: 10px !important">
    <v-expansion-panel-title class="text-h4 w-100 note-panel-title">
      <v-progress-linear
        class="note__loader"
        :active="loader"
        :indeterminate="loader"
        color="yellow"
        height="5"
      />

      <h4 v-text="note.title" />
      <base-display
        :span-value="note.date"
        keypath="notes.date"
        template-name="date"
        class="px-4 f-2"
      />
    </v-expansion-panel-title>
    <v-expansion-panel-text
      tag="article"
      class="d-flex flex-column text-center"
    >
      <note-display :note="note">
        <template #default>
          <v-col
            cols="12"
            class="d-flex flex-column flex-sm-row align-center justify-center"
          >
            <v-btn
              @click="$emit('edit-note', note.id)"
              :disabled="loader"
              class="edit-button my-2 mr-sm-2 f-15"
              v-text="$t('notes.editNote')"
            />
            <v-btn
              @click="deleteNote"
              :disabled="loader"
              class="delete-button f-15"
              v-text="$t('notes.deleteNote')"
            />
          </v-col>
        </template>
      </note-display>
    </v-expansion-panel-text>
  </v-expansion-panel>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { NoteDto } from "@/types/Note";
import NoteDisplay from "@/components/modules/singleTank/Notes/NoteDisplay.vue";
import { TankNoteService } from "@/services/endpoints";
import BaseDisplay from "@/components/common/Tank/TankBasicInfoDisplays/base/BaseDisplay.vue";
import { useTankStore } from "@/stores/TankStore";
const props = defineProps<{
  note: Required<NoteDto>;
}>();
const { tank, filterTankNotes } = useTankStore();
defineEmits<{
  (e: "edit-note", noteId: string): void;
}>();
const loader = ref(false);
async function deleteNote() {
  if (!tank) return;
  const {
    note: { id },
  } = props;
  loader.value = true;
  const result = await TankNoteService.delete({ url: `${tank._id}/${id}` });
  loader.value = false;
  if (result.success) filterTankNotes(id);
}
</script>
<style lang="scss">
.note__loader {
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 13px 13px 0 0;
}
.note-panel-title {
  .v-expansion-panel-title__icon {
    margin-inline-start: initial !important;
    -webkit-margin-start: initial;
  }
}
</style>
