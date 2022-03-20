<template>
  <transition
    :name="transitionName"
    @enter="enter"
    @after-enter="afterEnter"
    @leave="leave"
  >
    <slot />
  </transition>
</template>
<script setup lang="ts">
import { withDefaults } from "vue";

withDefaults(
  defineProps<{
    transitionName?: string;
  }>(),
  {
    transitionName: "expand",
  }
);
/* eslint-disable  @typescript-eslint/no-explicit-any */
function enter(slot: any) {
  const width = getComputedStyle(slot).width;

  slot.style.width = width;
  slot.style.position = "absolute";
  slot.style.visibility = "hidden";
  slot.style.height = "auto";

  const height = getComputedStyle(slot).height;

  slot.style.width = null;
  slot.style.position = null;
  slot.style.visibility = null;
  slot.style.height = 0;

  getComputedStyle(slot).height;

  requestAnimationFrame(() => {
    slot.style.height = height;
  });
}

function afterEnter(slot: any) {
  slot.style.height = "auto";
}

function leave(slot: any) {
  const height = getComputedStyle(slot).height;

  slot.style.height = height;

  getComputedStyle(slot).height;

  requestAnimationFrame(() => {
    slot.style.height = 0;
  });
}
</script>

<style scoped>
/*this optimize animation*/
* {
  will-change: height;
  transform: translateZ(0);
  backface-visibility: hidden;
  perspective: 1000px;
}

/* Possible transition variations */
.expand-enter-active,
.expand-leave-active {
  transition: height 1s ease-in-out;
  overflow: hidden;
}

.expand-enter,
.expand-leave-to {
  height: 0;
}
.doseTerminatedList-enter-active {
  transition: height 0.5s ease-out;
  overflow: hidden;
}
.doseTerminatedList-leave-active {
  transition: height 0.5s ease-in;
  overflow: hidden;
}

.doseTerminatedList-enter,
.doseTerminatedList-leave-to {
  height: 0;
}
</style>
