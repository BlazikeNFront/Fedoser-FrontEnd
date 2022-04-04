<template>
  <v-navigation-drawer
    permanent
    color="app-background"
    width="300"
    border="none"
  >
    <nav class="mx-auto h-100 d-flex flex-column justify-space-around">
      <h4
        class="ml-4 pt-6 h-4 text-white-text text-center"
        v-text="$t('global.appName')"
      ></h4>
      <ul class="menu py-4 pb-12">
        <li
          v-for="option in NAV_OPTIONS"
          :key="option.name"
          @click="$router.push({ name: option.name })"
        >
          <div class="menu__item">
            <p
              :class="['menu__text', isRouteActive(option) ? 'p--active' : '']"
            >
              <span class="menu__active-text-background"></span>
              {{ option.text }}
            </p>
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

import { NavOption } from "@/types/NavOptions";
const route = useRoute();
const router = useRouter();
const userStore = useUserStore();

const NAV_OPTIONS: NavOptions = [
  { icon: "icon", name: RoutesNames.APP_HOME, text: "APP HOME" },
  {
    icon: "icon",
    name: RoutesNames.USER_TANKS,
    text: "TANKS",
    childrens: [RoutesNames.TANK_DETAILS],
  },
  { icon: "icon", name: RoutesNames.ADD_TANK, text: "ADD TANK" },
  { icon: "icon", name: RoutesNames.LIVESTOCK_MOVE, text: "FEED TABLES" },
  { icon: "icon", name: RoutesNames.USER_SETTINGS, text: "USER SETTINGS" },
];
const isRouteActive = computed(() => (option: NavOption) => {
  let routeChildrens = [option.name];
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
.v-navigation-drawer {
  width: clamp(13rem, 100%, 40rem);
  background: red;
}
nav {
  border-radius: 25px;
  width: 25rem;
  background-color: $secondary-color;
}
ul {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  overflow: hidden;
}

li {
  padding: 2rem 0;
  width: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  text-align: center;
  list-style: none;
  color: white;
  overflow: hidden;
  text-transform: uppercase;
}
.menu__item {
  position: relative;
  width: 90%;
  height: 5.5rem;
  z-index: 300;
  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;
}

.menu__logout {
  justify-content: center;
}
.menu__item--logout {
  width: 50%;

  border-radius: 25px;

  background-color: $forth-color;
  color: $main-background-color;
}

.menu__item--background {
  position: absolute;
  top: 0;
  right: 0;
  width: 90%;
  height: 100%;
  padding: 1rem;
  border-radius: 25px 0 0 25px;
  background-color: $main-background-color;
  z-index: 200;
}
.menu__rounded-side {
  position: absolute;
  display: block;
  top: -2.2rem;
  right: 0;
  width: 2rem;
  height: 10rem;
  background-color: $main-background-color;
}

.menu__rounded-side::before {
  position: absolute;
  top: -1.8rem;
  right: 0rem;
  content: "";
  display: block;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  background-color: $secondary-color;
  z-index: 300;
}
.menu__rounded-side::after {
  position: absolute;
  bottom: -1.7rem;
  right: 0rem;
  content: "";
  display: block;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  background-color: $secondary-color;
  z-index: 300;
}
p {
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
    $main-background-color,
    $main-background-color 50%,
    $secondary-color 50%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-size: 200% 100%;
  background-position: -100%;
  transition: background-position 0.35s linear;
}

.p--active {
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
