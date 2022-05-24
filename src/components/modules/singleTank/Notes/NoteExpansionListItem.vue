<template>
  <v-expansion-panel bg-color="violet" style="border-radius: 10px !important">
    <v-expansion-panel-title class="text-h4 text-center">
      <v-progress-linear
        class="note__loader"
        :active="loader"
        :indeterminate="loader"
        color="yellow"
        height="5"
      />
      <h4 v-text="note.title" />
    </v-expansion-panel-title>
    <v-expansion-panel-text tag="article" class="d-flex flex-column">
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
import { TankNote } from "@/types/Tank";
import NoteDisplay from "@/components/modules/singleTank/Notes/NoteDisplay.vue";
import TankNotes from "@/services/endpoints/TankNotes";
import { useTankStore } from "@/stores/TankStore";
const props = defineProps<{
  note: Required<TankNote>;
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
  const result = await TankNotes.delete(tank._id, id);
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
</style>
