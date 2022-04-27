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
        <v-container
          ><v-row
            ><v-col cols="12"
              ><v-text-field v-model="annotationCopy.date" type="date"
            /></v-col>
            <v-col cols="12">
              <v-text-field v-model="annotationCopy.title" />
            </v-col>
            <v-col cols="12">
              <v-text-field v-model="annotationCopy.description" />
            </v-col>
            <v-col cols="12">
              <v-checkbox
                v-model="annotationCopy.isImportant"
                :label="$t('notes.isImportant')"
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
                    ><v-col cols="12"
                      ><v-text-field
                        v-model="enviromentalData.temperature"
                        type="number"
                        :label="$t('enviroment.temperature')"
                    /></v-col>
                    <v-col cols="12"
                      ><v-text-field
                        v-model="enviromentalData.ammonia"
                        :label="$t('enviroment.ammonia')"
                    /></v-col>
                    <v-col cols="12"
                      ><v-text-field
                        v-model="enviromentalData.ph"
                        :label="$t('enviroment.ph')"
                    /></v-col>
                    <v-col cols="12"
                      ><v-select
                        v-model="enviromentalData.weather"
                        :items="weatherSelectValues"
                        :label="$t('enviroment.weather')"
                      ></v-select
                    ></v-col> </v-row
                ></v-container>
              </transition-expand>
            </v-col>
          </v-row>
        </v-container>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>
<script setup lang="ts">
import { computed } from "vue";
import { TankAnnotation } from "@/types/TankAnnotation";
import { ref, reactive } from "vue";
import TransitionExpand from "@/components/common/TransitionExpand.vue";
import { enviromentalDataFactory } from "@/utils/factories/EnviromentalData";
import { Weather } from "@/constants/enums/Weather";
const showDialog = ref<string[]>([]);
const props = defineProps<{
  annotation: TankAnnotation;
}>();
const showEnviromentalData = ref(false);
const enviromentalData = reactive(enviromentalDataFactory());
const annotationCopy = computed(() => props.annotation);
const weatherSelectValues = computed(() =>
  Object.values(Weather).filter((key) => Number.isInteger(Number(key)))
);

function toggleDialog() {
  if (showDialog.value.length) return showDialog.value.pop();
  showDialog.value.push("addNoteDialog");
}
</script>
