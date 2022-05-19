<template>
  <button @click="$router.push(config)">BACK</button>
</template>
<script setup lang="ts">
import { RouteLocationRaw } from "vue-router";

defineProps<{ config: RouteLocationRaw }>();
</script>
