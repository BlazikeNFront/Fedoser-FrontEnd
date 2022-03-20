<template>
  <div style="margin: 15px 0">
    <label for="feed">{{ label }}</label>
    <select name="feed" id="feed" v-model="selectedFeed" @change="updateFeed">
      <option v-for="feed in feeds" :key="feed.name" :value="feed">
        {{ `${feed.name} ${feed.size}mm` }}
      </option>
    </select>
    <p v-if="doesFeedHaveFcr" class="text-center">
      FCR:{{ selectedFeed?.fcr }}
    </p>
  </div>
</template>
<script setup lang="ts">
import { Feed } from "@/types/Feed";
import { ref, computed, withDefaults } from "vue";

const props = withDefaults(
  defineProps<{
    modelValue: Feed | null;
    label?: string;
  }>(),
  {
    label: "Select Feed",
  }
);

const feeds = ref<Feed[]>([
  {
    name: "Aller Aqua Futura",
    size: "0.1-0.5",
    fcr: 0.7,
  },
  {
    name: "Aller Aqua Brone",
    size: "0.5-1",
    fcr: 0.8,
  },
  {
    name: "Aller Aqua Silver",
    size: "1-2",
    fcr: 0.9,
  },
  {
    name: "Aller Aqua Gold",
    size: "2-5",
    fcr: 1,
  },
]);
const doesFeedHaveFcr = computed(() => !!selectedFeed.value?.fcr);

const emit = defineEmits(["update:modelValue"]);

const selectedFeed = ref<Feed | null>(props.modelValue);

function updateFeed() {
  emit("update:modelValue", selectedFeed.value);
}
</script>
