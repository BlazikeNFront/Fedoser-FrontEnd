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
        <h3
          class="ml-4 py-4 h-3 text-white text-center"
          v-text="$t('global.appName')"
        ></h3>
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
                  <p class="f-2" v-text="$t(option.text)"></p></v-col
              ></v-row>
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
import { computed } from "vue";
import { NavOptions } from "@/types/NavOptions";
import { useRoute, useRouter } from "vue-router";
import { RoutesNames } from "@/constants/routesNames/RoutesNames";
import { useUserStore } from "@/stores/UserStore";
import { useNavDrawer } from "@/stores/NavDrawerStore";
import { Icons } from "@/constants/icons/MdiIcons";
import { NavOption } from "@/types/NavOptions";
import { storeToRefs } from "pinia";

const route = useRoute();
const router = useRouter();
const userStore = useUserStore();
const { showDrawer } = storeToRefs(useNavDrawer());

const NAV_OPTIONS: NavOptions = [
  { icon: Icons.HOME, name: RoutesNames.APP_HOME, text: "navBar.home" },
  {
    icon: Icons.FISH,
    name: RoutesNames.USER_TANKS,
    text: "navBar.tanks",
    childrens: [RoutesNames.TANK_DETAILS],
  },
  {
    icon: Icons.POLYGON_PLUS,
    name: RoutesNames.ADD_TANK,
    text: "navBar.addTank",
  },
  {
    icon: Icons.CLIPBOARD,
    name: RoutesNames.LIVESTOCK_MOVE,
    text: "navBar.feedTables",
  },
  {
    icon: Icons.ACCOUNT_SETTINGS,
    name: RoutesNames.USER_SETTINGS,
    text: "navBar.settings",
  },
];
const isRouteActive = computed(() => (option: NavOption) => {
  let routeChildrens = [option.name];
  //create array with main and nested routes
  if (option.childrens) {
    routeChildrens = routeChildrens.concat(option.childrens);
  }
  return routeChildrens.includes(route.name as string);
});
function logoutUser() {
  userStore.logoutAction();
  router.push({ name: RoutesNames.HOME });
}
</script>
<style lang="scss" scoped>
li:first-child {
  border-top: 2px solid black;
}
li {
  border-bottom: 2px solid black;
}
</style>
