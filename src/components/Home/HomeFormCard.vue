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
    <h4 class="f-2 my-3">{{ headerText }}</h4>
    <slot />
    <p v-if="isLoginPage" class="mt-7 f-15">
      You already have an account?<v-btn
        @click="$router.push({ name: RoutesNames.SIGN_IN })"
        color="blue"
        class="mx-2 f-125"
        >Click here</v-btn
      >
      to login
    </p>
    <p v-else class="mt-7 d-block f-15">
      You don't have an account?<v-btn
        @click="$router.push({ name: RoutesNames.SIGN_UP })"
        color="blue"
        class="mx-2 f-125"
        >Click here</v-btn
      >
      to sign up
    </p>
  </v-card>
</template>
<script setup lang="ts">
import { RoutesNames } from "@/constants/routesNames/RoutesNames";
import { computed } from "vue";
import { useRoute } from "vue-router";

defineProps<{
  loader: boolean;
  headerText: string;
}>();
const route = useRoute();

const isLoginPage = computed(() => route.name !== RoutesNames.SIGN_IN);
</script>
