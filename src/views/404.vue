<template>
  <div class="d-flex flex-column">
    <h2>Page not found</h2>
    <p>
      Click <router-link :to="{ name: RoutesNames.HOME }">here</router-link> to
      redirect to home page
    </p>
  </div>
</template>
<script setup lang="ts">
import { RoutesNames } from "@/constants/routesNames/RoutesNames";
</script>
