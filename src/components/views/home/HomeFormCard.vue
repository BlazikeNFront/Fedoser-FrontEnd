<template>
  <v-card
    class="mx-auto pb-6 text-white text-center home-form-card"
    style="width: clamp(30rem, 100%, 60rem)"
  >
    <v-progress-linear
      :active="loader"
      :indeterminate="loader"
      color="blue"
      height="5"
    />
    <h4 class="f-2 my-3" v-text="headerText" />
    <slot />
  </v-card>
</template>
<script setup lang="ts">
defineProps<{
  loader: boolean;
  headerText: string;
}>();
</script>
