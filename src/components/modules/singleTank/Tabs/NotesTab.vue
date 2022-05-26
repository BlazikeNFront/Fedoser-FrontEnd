<template>
  <section class="d-flex flex-column align-center justify-center">
    <h3 class="my-3 text-h3 text-center" v-text="$t('global.annotations')"></h3>
    <note-editor-dialog :annotation="editNote" ref="noteEditorDialog" />
    <v-expansion-panels v-if="notes.length">
      <v-container
        ><v-row
          ><v-col
            cols="12"
            lg="6"
            v-for="note in notes"
            :key="note.id"
            :offset-lg="notes.length > 1 ? 0 : 3"
          >
            <note-expansion-list-item
              :note="note"
              @edit-note="setNoteToEdit"
            /> </v-col></v-row
      ></v-container>
    </v-expansion-panels>
    <p v-else class="my-3 f-15 text-center" v-text="$t('notes.noNotes')"></p>
  </section>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { TankNote } from "@/types/Tank";
import NoteExpansionListItem from "@/components/modules/singleTank/Notes/NoteExpansionListItem.vue";
import NoteEditorDialog from "@/components/modules/singleTank/Notes/NoteEdtiorDialog.vue";
import { tankNoteFactory } from "@/utils/factories/TankAnnotation";
import { enviromentalDataFactory } from "@/utils/factories/EnviromentalData";
const props = defineProps<{
  notes: Required<TankNote>[];
}>();
const editNote = ref<TankNote>(tankNoteFactory());
const noteEditorDialog = ref<InstanceType<typeof NoteEditorDialog> | null>(
  null
);
async function setNoteToEdit(noteId: string) {
  const noteToEdit = props.notes.find((note) => note.id === noteId);
  if (noteToEdit && noteEditorDialog.value) {
    editNote.value = noteToEdit;
    noteEditorDialog.value.toggleDialog();
    //this whole block of code will be not necessery if v-dialog comes to play
    if (noteToEdit.enviromentalData) {
      noteEditorDialog.value.showEnviromentalData = true;
      noteEditorDialog.value.setEnviromentalData(noteToEdit.enviromentalData);
      return;
    }
    noteEditorDialog.value.showEnviromentalData = false;
    noteEditorDialog.value.setEnviromentalData(enviromentalDataFactory());
  }
}
</script>
