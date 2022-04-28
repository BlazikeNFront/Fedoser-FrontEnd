<template>
  <v-expansion-panels v-model="showDialog">
    <v-expansion-panel
      value="addNoteDialog"
      bg-color="violet"
      style="border-radius: 10px !important"
    >
      <v-btn
        @click="toggleDialog"
        class="app-button-background mr-4 f-15 align-self-end"
        block
        v-text="$t('notes.addNote')"
      />

      <v-expansion-panel-text tag="article" class="d-flex flex-column">
        <v-form ref="enviromentalDataForm">
          <v-container
            ><v-row
              ><v-col cols="12" md="5"
                ><v-text-field
                  v-model="annotationCopy.date"
                  type="date"
                  :rules="[FormRules.required]"
                  :label="$t('global.date')"
              /></v-col>
              <v-col cols="12" md="5">
                <v-text-field
                  v-model="annotationCopy.title"
                  :rules="[FormRules.required, FormRules.maxLength(100)]"
                  :label="$t('global.title')"
                />
              </v-col>
              <v-col cols="12" md="2">
                <v-checkbox
                  v-model="annotationCopy.isImportant"
                  :rules="[FormRules.required]"
                  :label="$t('notes.isImportant')"
                />
              </v-col>
              <v-col cols="12">
                <v-textarea
                  :rules="[FormRules.required, FormRules.maxLength(250)]"
                  v-model="annotationCopy.description"
                  :label="$t('global.description')"
                />
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
                  <v-radio
                    :value="false"
                    :label="$t('global.no')"
                    color="error"
                  />
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
                          :label="$t('enviroment.ph')"
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
                  class="app-button-background mr-4 f-15 align-self-end"
                  block
                  v-text="$t('global.save')"
                  @click="addNote"
              /></v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>
<script setup lang="ts">
import { computed } from "vue";
import { TankNote } from "@/types/TankAnnotation";
import { ref, reactive } from "vue";
import TransitionExpand from "@/components/common/TransitionExpand.vue";
import { enviromentalDataFactory } from "@/utils/factories/EnviromentalData";
import { FormRules } from "@/helpers/FormRules";
import { Weather } from "@/constants/enums/Weather";
import TankNotesService from "@/services/endpoints/TankNotes";
import { TankNoteDto } from "@/utils/DTOs/TankNote.dto";
import { useRoute } from "vue-router";
const { params } = useRoute();
const showDialog = ref<string[]>([]);
const props = defineProps<{
  annotation: TankNote;
}>();
const showEnviromentalData = ref(false);
const enviromentalDataForm = ref<HTMLFormElement | null>(null);
const enviromentalData = reactive(enviromentalDataFactory());
const annotationCopy = computed(() => props.annotation);
const weatherSelectValues = computed(() =>
  Object.values(Weather).filter((key) => Number.isInteger(Number(key)))
);

function toggleDialog() {
  if (showDialog.value.length) return showDialog.value.pop();
  showDialog.value.push("addNoteDialog");
}
async function addNote() {
  if (
    enviromentalDataForm.value &&
    !(await enviromentalDataForm.value.validate()).valid
  )
    return;
  const payload = { ...annotationCopy.value };
  if (showEnviromentalData.value) payload.enviromentalData = enviromentalData;
  const result = await TankNotesService.create(
    new TankNoteDto(payload),
    params.id as string
  );
  if (result.success) showDialog.value.pop();
}
</script>
