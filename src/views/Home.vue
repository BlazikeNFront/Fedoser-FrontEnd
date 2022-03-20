<template>
  <div class="d-flex flex-column">
    <div class="initial-view">
      <video
        preload="none"
        class="w-100 h-100"
        style="object-fit: cover"
        autoplay
        muted
        loop
        playsinline
        :poster="require('@/assets/homePageVideoFirstFrame.png')"
      >
        <source
          :src="require('@/assets/shuterstockTest.mp4')"
          type="video/mp4"
        />
      </video>
      <div class="w-100 h-100 video-overlay"></div>
      <div class="pa-8 initial-view__content-wrapper">
        <p
          class="f-2 text-uppercase text-white font-weight-bold"
          style="letter-spacing: 2px"
          @click="$router.push({ name: RoutesNames.HOME })"
        >
          Fedoser
        </p>
        <section class="d-flex flex-column align-center h-100">
          <h1
            class="mt-10 f-5 font-secondary text-white text-center text-uppercase"
            style="letter-spacing: 7px; margin-top: 4%"
          >
            Let's innovate aquaculture
          </h1>
          <div
            v-if="isInitialView"
            class="d-flex flex-column align-center justify-space-evenly h-100"
          >
            <p class="f-2 text-white font-weight bold text-center">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <div class="w-100 d-flex align-center justify-space-around">
              <v-btn
                width="40%"
                max-width="300"
                class="py-6 f-15 font-weight-bold"
                color="blue"
                @click="$router.push({ name: RoutesNames.SIGN_IN })"
              >
                Login
              </v-btn>
              <v-btn
                width="40%"
                max-width="300"
                class="py-6 f-15 font-weight-bold"
                color="blue"
                @click="showAboutSection = true"
                data-test="home-about-button"
              >
                About
              </v-btn>
            </div>
          </div>
          <main>
            <router-view v-slot="{ Component }">
              <transition>
                <component :is="Component" />
              </transition>
            </router-view>
          </main>
        </section>
      </div>
    </div>
    <about-section v-if="showAboutSection" />
  </div>
</template>
<script setup lang="ts">
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import AboutSection from "@/components/views/home/AboutSection.vue";
import { RoutesNames } from "@/constants/routesNames/RoutesNames";

const route = useRoute();
const showAboutSection = ref(false);
const isInitialView = computed(() => route.path === "/");
</script>
<style lang="scss">
.initial-view {
  position: relative;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
}

.video-overlay {
  position: absolute;
  top: 0;
  left: 0;
  background: #024564;
  mix-blend-mode: overlay;
}

.initial-view__content-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
