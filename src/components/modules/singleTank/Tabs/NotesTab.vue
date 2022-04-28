<template>
  <section class="d-flex flex-column align-center justify-center">
    <h3 class="my-3 text-h3 text-center" v-text="$t('notes.notes')"></h3>
    <note-editor-dialog :annotation="editNote" />

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
            <note-expansion-list-item :note="note" /> </v-col></v-row
      ></v-container>
    </v-expansion-panels>
    <p v-else class="my-3 f-15 text-center" v-text="$t('notes.noNotes')"></p>
  </section>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { TankNote } from "@/types/TankAnnotation";
import NoteExpansionListItem from "@/components/modules/singleTank/Notes/NoteExpansionListItem.vue";
import NoteEditorDialog from "@/components/modules/singleTank/Notes/NoteEdtiorDialog.vue";
import { tankNoteFactory } from "@/utils/factories/TankAnnotation";
defineProps<{
  notes: Required<TankNote[]>;
}>();
const editNote = ref<TankNote>(tankNoteFactory());
</script>
