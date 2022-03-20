<template>
  <div class="nav_wrapper">
    <nav>
      <h4>FEDOSER</h4>
      <ul class="menu">
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
            <transition>
              <div
                v-if="isRouteActive(option)"
                class="menu__item--background"
              ></div>
            </transition>
            <transition name="roundedSide">
              <div
                v-if="isRouteActive(option)"
                class="menu__rounded-side"
              ></div>
            </transition>
          </div>
        </li>
        <li class="menu__logout" v-if="userStore.isTokenProvided">
          <div class="menu__item menu__item--logout" @click="logoutUser">
            <p class="logout__text">Logout</p>
          </div>
        </li>
      </ul>
    </nav>
  </div>
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
.nav_wrapper {
  width: $nav-width;
}
nav {
  margin: 0 auto;
  margin-top: 5rem;
  border-radius: 25px;
  width: 25rem;
  min-height: 70rem;
  height: 90vh;
  background-color: $secondary-color;
  h4 {
    padding-top: 2rem;
    text-align: center;
    color: $main-background-color;
  }
}
ul {
  margin: 0 auto;
  border-radius: 25px;
  width: 25rem;
  min-height: 70rem;
  background-color: $secondary-color;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  overflow: hidden;
  h4 {
    width: 100%;
    color: $main-background-color;
    text-align: center;
  }
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

.roundedSide-enter-from {
  height: 0;
}
.roundedSide-enter-active {
  transition-property: all;
  transition-delay: 0.02s;
}
.roundedSide-enter-to {
  height: 10rem;
}
.roundedSide-leave-from {
  height: 10rem;
}
.roundedSide-leave-active {
  transition-property: all;
  transition-delay: 0.35s;
}
.roundedSide-leave-to {
  height: 0;
}

.v-enter-from {
  transform: translate(100%);
}
.v-enter-active {
  transition: transform 0.4s ease-out;
}
.v-enter-to {
  transform: translate(0%);
}
.v-leave-from {
  transform: translate(0%);
}
.v-leave-active {
  transition: transform 0.4s ease-in;
}
.v-leave-to {
  transform: translate(100%);
}
</style>
