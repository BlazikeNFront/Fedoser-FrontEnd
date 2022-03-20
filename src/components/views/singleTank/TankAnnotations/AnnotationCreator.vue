<template>
  <div class="backdrop">
    <div class="dialog d-flex flex-column">
      <div class="d-flex flex-column dialog__data">
        <div
          @click="emit('close-dialog')"
          class="d-flex button--close dialog__close-button"
        >
          X
        </div>
        <div class="form-control">
          <label>Date</label>
          <input
            type="text"
            v-model="annotationModel.date"
            @update:modelValue="
              emit('update:modelValue', { ...modelValue, ...{ date: $event } })
            "
          />
        </div>
        <div class="form-control">
          <label>Title</label>
          <input
            type="text"
            v-model="annotationModel.title"
            @update:modelValue="
              emit('update:modelValue', { ...modelValue, ...{ title: $event } })
            "
          />
        </div>
        <div class="form-control">
          <label>Description</label>
          <input
            typeof="text"
            v-model="annotationModel.description"
            @update:modelValue="
              emit('update:modelValue', {
                ...modelValue,
                ...{ description: $event },
              })
            "
          />
        </div>
        <div class="form-control">
          <div>
            <input
              v-model="annotationModel.isImportant"
              @update:modelValue="
                emit('update:modelValue', {
                  ...modelValue,
                  ...{ isImportant: $event },
                })
              "
              type="radio"
              id="nonImportant"
              name="isImportant"
              :value="false"
              checked
            />
            <label for="nonImportant">Non important</label>
          </div>
          <div>
            <input
              v-model="annotationModel.isImportant"
              :value="true"
              @update:modelValue="
                emit('update:modelValue', {
                  ...modelValue,
                  ...{ isImportant: $event },
                })
              "
              type="radio"
              id="Important"
              name="isImportant"
            />
            <label for="Important">Important</label>
          </div>
          <div>
            <div>
              <h4>Add Enviromental data</h4>
              <div>
                <input
                  v-model="isEnviromentalDataVisible"
                  :value="true"
                  type="radio"
                  id="showEnviromentalData"
                  name="isEnviromentalData"
                />
                <label for="showEnviromentalData">Yes</label>
              </div>
              <div>
                <input
                  v-model="isEnviromentalDataVisible"
                  :value="false"
                  type="radio"
                  id="hideEnviromentData"
                  name="isEnviromentalData"
                />
                <label for="hideEnviromentData">No</label>
              </div>
            </div>
            <enviromental-data-form
              v-if="annotationModel.enviromentalData"
              v-model="annotationModel.enviromentalData"
            />
          </div>
        </div>
      </div>
      <button @click="setAnnoationRequest">
        {{ annotationModel.id ? "Edit annoation" : "Create annotation" }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, inject, watch } from "vue";
import { TankAnnotation } from "@/types/TankAnnotation";
import EnviromentalDataForm from "@/components/views/singleTank/TankAnnotations/EnviromentalData.vue";
import AnnotationService from "@/services/endpoints/TankAnnotation";
import { TANK_ID } from "@/constants/providersNames/providersNames";
import { enviromentalDataFactory } from "@/utils/factories/EnviromentalData";
import { API_DATA_KEY } from "@/constants/global";
const props = defineProps<{
  modelValue: TankAnnotation;
}>();

const emit = defineEmits(["update:modelValue", "close-dialog"]);

const { tankId } = inject(TANK_ID) as { tankId: string };
const annotationModel = computed({
  get: () => props.modelValue,
  set: (newValue) => emit("update:modelValue", newValue),
});

const isEnviromentalDataVisible = ref<boolean>(
  !!annotationModel.value.enviromentalData
);
watch(isEnviromentalDataVisible, (newVal) => {
  if (newVal) {
    showEnviromentalData();
  }
});

function showEnviromentalData() {
  if (!props.modelValue.enviromentalData) {
    annotationModel.value = {
      ...annotationModel.value,
      enviromentalData: enviromentalDataFactory(),
    };
  }
  isEnviromentalDataVisible.value = true;
}

async function setAnnoationRequest() {
  const result = annotationModel.value.id
    ? await AnnotationService.update(tankId, annotationModel.value)
    : await AnnotationService.create(props.modelValue, tankId);
  if (API_DATA_KEY in result) {
    emit("update:modelValue", {
      ...props.modelValue,
      ...{ id: result.data?.id },
    });
  }
}
</script>
<style lang="scss" scoped>
.backdrop {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
}
.dialog {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 15px;
  background-color: $secondary-color;
}
.dialog__data {
  position: relative;
  padding: 20px 30px;
}
.dialog__close-button {
  position: absolute;
  top: 0;
  right: 0;
  width: 3rem;
  height: 3rem;
  font-size: 2rem;
  font-weight: 700;
  border-radius: 10px;
  cursor: pointer;
}
</style>
