<template>
  <div>
    <div class="backdrop"></div>
    <div class="dialog">
      <div class="dialog__data d-flex flex-column">
        <div
          class="d-flex dialog__close--button"
          @click="$emit('close-dialog')"
        >
          X
        </div>
        <div class="form-control">
          <span>Date</span>
          <p>{{ annotation.date }}</p>
        </div>
        <div class="form-control">
          <span>Title</span>
          <p>{{ annotation.title }}</p>
        </div>
        <div class="form-control">
          <span>Description</span>
          <p>{{ annotation.description }}</p>
        </div>
        <div class="form-control">
          <span>Important:</span>
          <p>{{ annotation.isImportant }}</p>
        </div>
        <div class="enviromentalData__table">
          <table v-if="annotation.enviromentalData">
            <tbody>
              <tr
                v-for="(information, key) in annotation.enviromentalData"
                :key="key"
              >
                <td>{{ key }}</td>
                <td>{{ information }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <button
          class="button button__edit--button"
          @click="$emit('edit-annotation-request', annotation.id)"
        >
          Edit
        </button>
        <button class="button button__delete--button" @click="deleteAnnotation">
          Delete
        </button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { inject } from "vue";
import TankAnnotationService from "@/services/endpoints/TankAnnotation";
import { TankAnnotation } from "@/types/TankAnnotation";
import { TANK_ID } from "@/constants/providersNames/providersNames";
const props = defineProps<{
  annotation: TankAnnotation;
}>();
const { tankId } = inject(TANK_ID) as { tankId: string };
const emit = defineEmits([
  "close-dialog",
  "edit-annotation-request",
  "annotation-deleted",
]);

async function deleteAnnotation() {
  const { id } = props.annotation;
  if (id) {
    const request = await TankAnnotationService.delete(tankId, id);
    if (request) emit("annotation-deleted");
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
.dialog__close--button {
  position: absolute;
  top: 0;
  right: 0;
  width: 3rem;
  height: 3rem;
  font-size: 2rem;
  font-weight: 700;
  border-radius: 10px;
  background-color: #910404;
  cursor: pointer;
}
.button__edit--button {
  background-color: $tertiary-color;
  color: black;
  font-weight: 700;
}
.button__delete--button {
  background-color: #910404;
  color: white;
  font-weight: 700;
}
</style>
