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
    <i18n-t
      v-if="isLoginPage"
      class="mt-7 f-15"
      keypath="auth.alreadyHaveAccount"
      tag="p"
      scope="global"
    >
      <template #button>
        <v-btn
          @click="$router.push({ name: RoutesNames.SIGN_IN })"
          color="blue"
          class="mx-2 f-125"
          v-t="'global.clickHere'"
        />
      </template>
    </i18n-t>
    <i18n-t
      v-else
      class="mt-7 f-15"
      keypath="auth.notHaveAccountPart"
      tag="p"
      scope="global"
    >
      <template #button>
        <v-btn
          @click="$router.push({ name: RoutesNames.SIGN_UP })"
          color="blue"
          class="mx-2 f-125"
          v-t="'global.clickHere'"
        />
      </template>
    </i18n-t>
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
