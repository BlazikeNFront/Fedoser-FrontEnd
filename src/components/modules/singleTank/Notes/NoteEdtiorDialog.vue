<template>
  <v-dialog v-model="showDialog" class="editor-dialog note-dialog">
    <template #activator="{ props }">
      <v-btn
        v-bind="props"
        class="app-button mx-auto f-15 align-self-end"
        width="300"
        v-text="$t('notes.addNote')"
      />
    </template>

    <v-form
      ref="noteDataForm"
      style="overflow-y: auto; max-height: 100vh; min-width: 300px"
    >
      <v-container
        ><v-row>
          <v-col cols="12"
            ><h4 class="text-h4 text-center" v-text="$t('notes.note')"></h4
          ></v-col>
          <v-col cols="12" md="6"
            ><v-text-field
              v-model="annotationCopy.date"
              type="date"
              :rules="[FormRules.required]"
              :label="$t('global.date')"
          /></v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="annotationCopy.title"
              :rules="[FormRules.required, FormRules.maxLength(100)]"
              :label="$t('global.title')"
            />
          </v-col>

          <v-col cols="12">
            <v-textarea
              :rules="[FormRules.required, FormRules.maxLength(250)]"
              v-model="annotationCopy.description"
              :label="$t('global.description')"
            />
          </v-col>
          <v-col cols="12" class="d-flex align-center justify-center">
            <div>
              <v-checkbox
                class="noteDataForm__important-checkbox f-2"
                v-model="annotationCopy.isImportant"
                :label="$t('notes.markAsimportant')"
                hide-details
              />
            </div>
          </v-col>
          <v-col cols="12">
            <p
              class="f-2 text-center"
              v-text="$t('notes.addEnviromantalDataQuestion')"
            />
            <v-radio-group
              v-model="showEnviromentalData"
              class="d-flex align-center justify-center"
              inline
            >
              <v-radio
                :value="true"
                :label="$t('global.yes')"
                color="success"
              />
              <v-radio :value="false" :label="$t('global.no')" color="error" />
            </v-radio-group>
            <transition-expand>
              <v-container v-if="showEnviromentalData"
                ><v-row
                  ><v-col cols="12" md="6"
                    ><v-text-field
                      v-model="enviromentalData.temperature"
                      :rules="[
                        FormRules.required,
                        FormRules.numberHigherThan(0),
                      ]"
                      type="number"
                      :label="$t('enviroment.temperature')"
                  /></v-col>
                  <v-col cols="12" md="6"
                    ><v-text-field
                      v-model="enviromentalData.ammonia"
                      :label="$t('enviroment.ammonia')"
                      type="number"
                      :rules="[
                        FormRules.required,
                        FormRules.numberHigherThan(0),
                        FormRules.numberLowerThan(10000),
                      ]"
                  /></v-col>
                  <v-col cols="12" md="6"
                    ><v-text-field
                      v-model="enviromentalData.ph"
                      type="number"
                      :rules="[
                        FormRules.required,
                        FormRules.numberHigherThan(1),
                        FormRules.numberLowerThan(14),
                      ]"
                      :label="$t('enviroment.pH')"
                  /></v-col>
                  <v-col cols="12" md="6"
                    ><v-select
                      v-model="enviromentalData.weather"
                      :items="weatherSelectValues"
                      :rules="[FormRules.required]"
                      :label="$t('enviroment.weather')"
                    ></v-select
                  ></v-col> </v-row
              ></v-container>
            </transition-expand>
          </v-col>
          <v-col cols="12"
            ><v-btn
              class="app-button mr-4 f-15 align-self-end text-white"
              block
              v-text="$t('global.save')"
              @click="onSaveButtonClick"
          /></v-col>
        </v-row>
      </v-container>
    </v-form>
  </v-dialog>
</template>
<script setup lang="ts">
import { computed } from "vue";
import { ref, reactive } from "vue";
import TransitionExpand from "@/components/common/TransitionExpand.vue";
import { FormRules } from "@/helpers/FormRules";
import { Weather } from "@/constants/enums/Weather";
import { TankNoteService } from "@/api/endpoints";
import { NoteDto } from "@/types/Note";
import { useRoute } from "vue-router";
import {
  EnviromentalData,
  createBaseEnviromentalData,
} from "@/types/EnviromentalData";
import { useTankStore } from "@/stores/TankStore";
const { params } = useRoute();
const { addNoteToTank, editTankNote } = useTankStore();
const showDialog = ref<boolean>(false);
const props = defineProps<{
  annotation: NoteDto;
}>();

const showEnviromentalData = ref(false);
const noteDataForm = ref<HTMLFormElement | null>(null);
const enviromentalData = reactive(createBaseEnviromentalData());

const annotationCopy = computed((): NoteDto => props.annotation);
const weatherSelectValues = computed(() =>
  Object.values(Weather).filter((key) => Number.isInteger(Number(key)))
);

function toggleDialog() {
  showDialog.value = !showDialog.value;
}
function setEnviromentalData(enviromentData: EnviromentalData) {
  Object.keys(enviromentData).forEach(
    (key) =>
      (enviromentalData[key as keyof typeof enviromentalData] =
        enviromentData[key as keyof typeof enviromentalData])
  );
}

async function addNote(payload: Partial<NoteDto>) {
  const result = await TankNoteService.post(new NoteDto(payload), {
    url: params.id as string,
  });
  if (!result.success) return;
  if (!payload.id && result.data?.id) {
    payload.id = result.data.id;
    addNoteToTank(payload as Required<NoteDto>);
  }
  toggleDialog();
}
async function editNote(payload: Required<NoteDto>) {
  const result = await TankNoteService.patch(new NoteDto(payload), {
    url: params.id as string,
  });
  if (!result.success) return;
  editTankNote(payload);
  toggleDialog();
}

async function onSaveButtonClick() {
  if (noteDataForm.value && !(await noteDataForm.value.validate()).valid)
    return;
  const payload = { ...annotationCopy.value };
  if (showEnviromentalData.value) payload.enviromentalData = enviromentalData;
  if (payload.id) await editNote(payload as Required<NoteDto>);
  else await addNote(payload);
}
defineExpose({
  toggleDialog,
  showEnviromentalData,
  setEnviromentalData,
});
</script>
<style lang="scss">
.note-dialog {
  .v-overlay__content {
    background-color: rgb(var(--v-theme-violet));
  }
}
.noteDataForm__important-checkbox:deep(.v-label) {
  font-size: 1.5rem;
}
</style>
