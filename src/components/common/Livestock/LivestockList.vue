<template>
  <div style="padding: 10px 15px; border: 1px dotted salmon">
    <p>
      Initial livestock Mass:
      {{ livestockInformation.initialLivestockWeight }}kg
    </p>
    <ul>
      <li
        v-for="specie in livestockInformation.livestock"
        :key="specie.name"
        class="d-flex align-center justify-space-around specie_control"
      >
        <div class="d-flex align-start">
          <p style="font-size: 1.5rem">
            <span class="f-bold">Specie:</span>{{ specie.name }}
          </p>
          <div style="margin-left: 1rem">
            <p><span class="f-bold">Weight:</span>{{ specie.weight }}</p>
            <p>
              <span class="f-bold">MeanWeight:</span>{{ specie.meanWeight }}
            </p>
            <p><span class="f-bold">Quantity:</span>{{ specie.quantity }}</p>
          </div>
        </div>
        <div v-if="deleteOption">
          <button
            class="button rounded"
            @click="$emit('deleteRequest', specie.name)"
          >
            X
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { withDefaults } from "vue";
import { LivestockInformation } from "@/types/Livestock";

withDefaults(
  defineProps<{
    livestockInformation: LivestockInformation;
    deleteOption?: boolean;
  }>(),
  {
    deleteOption: false,
  }
);

defineEmits(["deleteRequest"]);
</script>
<style scoped>
.specie_control {
  padding: 0.5rem 1rem;
  border: 1px solid slateblue;
  border-radius: 20px;
}
</style>
