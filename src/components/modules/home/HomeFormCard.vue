<template>
  <v-card
    class="mx-auto pb-6 text-white text-center home-form-card"
    style="width: clamp(30rem, 100%, 60rem)"
  >
    <v-progress-linear
      :active="loader"
      :indeterminate="loader"
      color="yellow"
      height="5"
    />
    <p class="f-3 my-3" v-text="headerText" />
    <slot />
  </v-card>
</template>
<script setup lang="ts">
defineProps<{
  loader: boolean;
  headerText: string;
}>();
</script>
