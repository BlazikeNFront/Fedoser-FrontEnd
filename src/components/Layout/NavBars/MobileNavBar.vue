<template>
  <v-navigation-drawer
    v-model="showDrawer"
    color="violet"
    width="300"
    style="position: fixed"
  >
    <div
      class="mx-auto py-4 d-flex flex-column justify-space-between"
      style="width: 300px; min-height: 80vh"
    >
      <div>
        <h3 class="ml-4 py-4 h-3 text-white text-center">
          {{ $t("global.appName") }}
        </h3>
        <ul class="py-4 pb-2 d-flex flex-column align-center justify-center">
          <li
            v-for="option in NAV_OPTIONS"
            :key="option.name"
            @click="$router.push({ name: option.name })"
            class="py-2 d-flex align-center justify-space-between text-center text-uppercase w-100"
            :class="isRouteActive(option) ? 'shadow-bg' : ' '"
          >
            <v-container>
              <v-row
                ><v-col cols="4" class="d-flex align-center justify-end">
                  <v-icon
                    style="z-index: 500"
                    :icon="option.icon"
                    color="yellow"
                    size="25" /></v-col
                ><v-col cols="8" class="d-flex align-center justify-start">
                  <p class="f-2">{{ $t(option.text) }}</p></v-col
                ></v-row
              >
            </v-container>
          </li>
        </ul>
      </div>
      <v-btn
        @click="logoutUser"
        class="f-15 align-self-center"
        color="red"
        v-text="$t('auth.logout')"
      />
    </div>
  </v-navigation-drawer>
</template>
<script setup lang="ts">
import { useNavDrawer } from "@/stores/NavDrawerStore";
import useNavConfig from "@/hooks/useNavConfig";
import { storeToRefs } from "pinia";
const { showDrawer } = storeToRefs(useNavDrawer());
const { NAV_OPTIONS, isRouteActive, logoutUser } = useNavConfig();
</script>
<style lang="scss" scoped>
li:first-child {
  border-top: 2px solid black;
}
li {
  border-bottom: 2px solid black;
}
</style>
