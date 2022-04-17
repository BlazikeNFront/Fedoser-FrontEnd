<template>
  <div>
    <p class="f-2 text-center" v-text="$t('global.feed')"></p>
    <v-menu top offset-y transition="slide-y-transition" v-model="showMenu">
      <template #activator="{ props }">
        <v-card
          v-bind="props"
          flat
          class="d-flex align-center justify-center"
          color="red"
        >
          <p class="py-2 f-15">
            {{ `${modelValueCopy?.name} ${modelValueCopy?.size}mm` }}
          </p></v-card
        >
      </template>
      <v-list class="rounded-t-0">
        <v-list-item
          v-for="(item, key) in FEEDS"
          :key="key"
          class="d-flex align-center justify-center text-center"
          @click="onFeedSelect(item)"
        >
          <p class="my-3 f-15">
            {{ `${item?.name} ${item?.size}mm` }}
          </p>
        </v-list-item>
      </v-list>
    </v-menu>
    <p v-if="doesFeedHaveFcr" class="text-center f-15">
      FCR:{{ modelValue?.fcr }}
    </p>
  </div>
</template>
<script setup lang="ts">
import { FEEDS } from "@/constants/enums/FeedSelect";
import { Feed } from "@/types/Feed";
import {
  ref,
  computed,
  withDefaults,
  WritableComputedRef,
  onBeforeMount,
} from "vue";

const props = withDefaults(
  defineProps<{
    modelValue: Feed | null;
    label?: string;
  }>(),
  {
    label: "Select Feed",
  }
);
const emit = defineEmits<{
  (e: "update:modelValue", feed: Feed): void;
}>();
const showMenu = ref(false);
const modelValueCopy: WritableComputedRef<Feed> = computed({
  get(): Feed {
    return props.modelValue || FEEDS[0];
  },
  set(newFeed: Feed) {
    emit("update:modelValue", newFeed);
  },
});
const doesFeedHaveFcr = computed(() => !!props.modelValue); // ?.fcr after v-select update
function onFeedSelect(feed: Feed) {
  modelValueCopy.value = feed;
  showMenu.value = false;
}
onBeforeMount(() => {
  if (!props.modelValue) emit("update:modelValue", FEEDS[1]);
});
</script>
