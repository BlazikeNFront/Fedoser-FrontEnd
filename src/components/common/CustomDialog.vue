<template>
  <div>
    <div class="backdrop" @click="$emit('backdrop-click')"></div>
    <dialog class="content">
      <slot></slot>
    </dialog>
  </div>
</template>
<script setup lang="ts">
defineEmits(["backdrop-click"]);
</script>
<style scoped>
.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
}
.content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid darkslateblue;
  width: clamp(30rem, 80%, 50rem);
  border-radius: 10px;
  padding: 2rem 1.5rem;
  display: block;
}
</style>
