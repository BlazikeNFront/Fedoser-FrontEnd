<template>
  <div>
    <button class="button" @click="showAddTankAnnotation()">
      Add Annotation
    </button>
    <ol>
      <li
        v-for="annotation in annotations"
        :key="annotation.id"
        class="d-flex flex-column annotation"
      >
        <div class="d-flex">
          <div
            class="form-control"
            style="border-right: 2px solid black; padding: 10px"
          >
            <span>Date:</span>
            <p>{{ annotation.date }}</p>
          </div>
          <div
            class="form-control"
            style="border-right: 2px solid black; padding: 10px"
          >
            <h4>{{ annotation.title }}</h4>
          </div>
          <div class="form-control">
            <span>Important:</span>
            <p>{{ annotation.isImportant }}</p>
          </div>
        </div>
        <button class="button" @click="showAnnotation(annotation.id as string)">
          Details
        </button>
      </li>
    </ol>
    <annotation-creator
      v-if="isAnnotationDialogVisible"
      v-model="pickedAnnotation"
      @close-dialog="isAnnotationDialogVisible = false"
    />
    <single-annotations
      v-if="showSingleAnnotation"
      :annotation="pickedAnnotation"
      @close-dialog="showSingleAnnotation = false"
      @edit-annotation-request="
        showAddTankAnnotation($event);
        showSingleAnnotation = false;
      "
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { TankAnnotation } from "@/types/TankAnnotation";
import AnnotationCreator from "@/components/views/singleTank/TankAnnotations/AnnotationCreator.vue";
import SingleAnnotations from "./SingleAnnotations.vue";
import { tankAnnotationFactory } from "@/utils/factories/TankAnnotation";

const props = defineProps<{
  annotations: TankAnnotation[];
}>();
const pickedAnnotation = ref<TankAnnotation>(tankAnnotationFactory());
const isAnnotationDialogVisible = ref<boolean>(false);
const showSingleAnnotation = ref<boolean>(false);

function showAddTankAnnotation(id = "") {
  if (id) {
    const foundAnnotation = props.annotations.find(
      (annotation) => annotation.id === id
    );
    if (foundAnnotation) pickedAnnotation.value = foundAnnotation;
  } else pickedAnnotation.value = tankAnnotationFactory();
  isAnnotationDialogVisible.value = true;
}
function showAnnotation(id: string) {
  const foundAnnotation = props.annotations.find(
    (annotation) => annotation.id === id
  );
  if (foundAnnotation) {
    pickedAnnotation.value = foundAnnotation;
    showSingleAnnotation.value = true;
  }
}
</script>
<style lang="scss">
.annotation {
  padding: 10px 20px;
  background-color: $tertiary-color;
  color: black;
  border-radius: 25px;
}
</style>
