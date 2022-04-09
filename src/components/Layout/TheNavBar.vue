<template>
  <v-navigation-drawer
    permanent
    color="app-background"
    width="300"
    border="none"
  >
    <nav
      class="mx-auto h-90 d-flex flex-column justify-space-around"
      style="margin-top: 18%"
    >
      <h4
        class="ml-4 pt-6 h-4 text-white-text text-center"
        v-text="$t('global.appName')"
      ></h4>
      <ul
        class="py-4 pb-12 d-flex flex-column align-end justify-center over-hidden"
      >
        <li
          v-for="option in NAV_OPTIONS"
          :key="option.name"
          @click="$router.push({ name: option.name })"
          class="py-6 w-100 d-flex align-end justify-end text-center text-uppercase over-hidden"
        >
          <div
            class="menu__item pos-relative d-flex align-center justify-center pointer w-100"
          >
            <div class="d-flex align-center w-70">
              <v-icon
                style="z-index: 500"
                :icon="option.icon"
                color="yellow"
                size="25"
              />
              <p
                :class="[
                  'menu__text',
                  isRouteActive(option) ? 'menu__text--active' : '',
                ]"
                v-text="$t(option.text)"
              ></p>
            </div>
            <transition name="menuItemBackground">
              <div
                v-if="isRouteActive(option)"
                class="menu__item--background"
              ></div>
            </transition>
            <transition name="menuItemroundedSide">
              <div
                v-if="isRouteActive(option)"
                class="menu__rounded-side"
              ></div>
            </transition>
          </div>
        </li>
        <v-btn
          @click="logoutUser"
          class="mt-8 f-15 align-self-center"
          color="red"
          v-text="$t('auth.logout')"
        >
        </v-btn>
      </ul>
    </nav>
  </v-navigation-drawer>
</template>
<script setup lang="ts">
import { computed } from "vue";
import { NavOptions } from "@/types/NavOptions";
import { useRoute, useRouter } from "vue-router";
import { RoutesNames } from "@/constants/routesNames/RoutesNames";
import { useUserStore } from "@/stores/UserStore";
import { Icons } from "@/constants/icons/MdiIcons";
import { NavOption } from "@/types/NavOptions";
const route = useRoute();
const router = useRouter();
const userStore = useUserStore();

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
<style lang="scss">
@mixin menu__rounded-side-pseudo-elements-shared {
  content: "";
  position: absolute;
  right: 0rem;
  display: block;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  background-color: rgb(var(--v-theme-violet));
  z-index: $nav-menu-item;
}
.v-navigation-drawer {
  width: clamp(13rem, 100%, 40rem);
}
nav {
  border-radius: 25px;
  width: 25rem;
  background-color: rgb(var(--v-theme-violet));
}
.menu__item {
  height: 5.5rem;
  z-index: $nav-menu-item;
}

.menu__item--background {
  position: absolute;
  top: 0;
  right: 0;
  width: 90%;
  height: 100%;
  padding: 1rem;
  border-radius: 25px 0 0 25px;
  background-color: rgb(var(--v-theme-app-background));
  z-index: $nav-menu-background;
}
.menu__rounded-side {
  position: absolute;
  display: block;
  top: -2.2rem;
  right: 0;
  width: 2rem;
  height: 10rem;
  background-color: rgb(var(--v-theme-app-background));
}

.menu__rounded-side::before {
  @include menu__rounded-side-pseudo-elements-shared;
  top: -1.8rem;
}

.menu__rounded-side::after {
  @include menu__rounded-side-pseudo-elements-shared;
  bottom: -1.7rem;
}
.menu__text {
  width: 100%;
  position: relative;
  color: transparent;
  font-size: 1.5rem;
  font-weight: 700;
  z-index: 400;
  overflow: hidden;
  background-clip: text;
  background: linear-gradient(
    to left,
    rgb(var(--v-theme-app-background)),
    rgb(var(--v-theme-app-background)) 50%,
    rgb(var(--v-theme-violet)) 50%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-size: 200% 100%;
  background-position: -100%;
  transition: background-position 0.35s linear;
}

.menu__text--active {
  background-position: 0%;
}

.menuItemroundedSide-enter-from,
.menuItemroundedSide-leave-to {
  height: 0;
}
.menuItemroundedSide-enter-active {
  transition-property: height;
  transition-delay: 0.02s;
}
.menuItemroundedSide-enter-to,
.menuItemroundedSide-leave-from {
  height: 10rem;
}

.menuItemroundedSide-leave-active {
  transition-property: all;
  transition-delay: 0.35s;
}

.menuItemBackground-enter-from,
.menuItemBackground-leave-to {
  transform: translate(100%);
}
.menuItemBackground-enter-active {
  transition: transform 0.4s ease-out;
}
.menuItemBackground-leave-active {
  transition: transform 0.4s ease-in;
}
.menuItemBackground-enter-to,
.menuItemBackground-leave-from {
  transform: translate(0%);
}
</style>
