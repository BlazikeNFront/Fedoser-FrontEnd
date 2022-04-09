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
        <div class="d-flex align-center justify-space-between">
          <p
            class="f-2 text-uppercase text-white font-weight-bold"
            style="letter-spacing: 2px"
            @click="$router.push({ name: RoutesNames.HOME })"
            v-text="APP_NAME"
          ></p>
          <language-switcher :select-icon-width="30" :select-width="200" />
        </div>
        <v-main
          class="d-flex flex-column align-center justify-space-around h-100"
        >
          <h1
            class="mt-10 f-5 font-secondary text-white text-center text-uppercase"
            style="letter-spacing: 7px; margin-top: 4%"
            v-text="APP_SLOGAN"
          ></h1>
          <router-view v-slot="{ Component }">
            <transition name="fade" mode="out-in">
              <component :is="Component" class="mt-15" />
            </transition>
          </router-view>
        </v-main>
      </div>
    </div>
    <suspense>
      <about-section
        v-if="showAboutSection"
        @vnode-mounted="scrollIntoAboutSection"
      />
    </suspense>
  </div>
</template>
<script setup lang="ts">
import { defineAsyncComponent } from "vue";
import { storeToRefs } from "pinia";
import { APP_NAME, APP_SLOGAN } from "@/constants/global";
import { RoutesNames } from "@/constants/routesNames/RoutesNames";
import LanguageSwitcher from "@/components/common/LanguageSwitcher.vue";
import { useHomePageStore } from "@/stores/HomePageStore";
const { showAboutSection } = storeToRefs(useHomePageStore());
const { scrollIntoAboutSection } = useHomePageStore();
const AboutSection = defineAsyncComponent(
  async () =>
    await import(
      /* webpackChunkName: "about-section" */ "@/components/views/home/AboutSection.vue"
    )
);
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
