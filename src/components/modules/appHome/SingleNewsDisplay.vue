<template>
  <v-dialog v-model="dialog" fullscreen transition="dialog-bottom-transition">
    <template #activator="{ props }">
      <v-btn
        class="f-15 font-weight-bold text-light-blue shadow-bg"
        dark
        v-bind="props"
        v-text="$t('global.show')"
      />
    </template>

    <v-sheet class="pos-relative">
      <div v-for="(image, index) in carouselItems" :key="index">
        <transition name="background-image" mode="out-in" tag="div">
          <div
            v-if="sliderImageIndex === index"
            class="single-news__background"
            :style="`
      background-image: url(${image.url});background-size: cover;`"
          ></div>
        </transition>
      </div>

      <v-toolbar tag="div" dark color="blue">
        <v-spacer />
        <v-btn class="f-15" @click="dialog = false">
          {{ $t("global.close") }}
          <v-icon class="ml-2" :icon="Icons.EXIT" />
        </v-btn>
      </v-toolbar>
      <div class="single-news__content">
        <v-container>
          <v-row>
            <v-col cols="12" lg="7" class="d-flex align-center justify-center">
              <v-carousel v-model="sliderImageIndex" :show-arrows="false">
                <v-carousel-item
                  v-for="(image, index) in carouselItems"
                  :key="index"
                  :src="image.url"
                /> </v-carousel
            ></v-col>
            <v-col cols="12" lg="5" class="d-flex align-center justify-center"
              ><v-sheet
                tag="article"
                color="transparent"
                class="px-3 py-2 d-flex flex-column align-center justify-center shadow-bg radius-4"
              >
                <h3
                  class="py-2 text-h3 text-white"
                  v-text="article.header"
                ></h3>
                <p
                  class="f-15 text-white text-justify"
                  style="line-height: 3rem"
                  v-text="article.content"
                ></p> </v-sheet
            ></v-col>
          </v-row>
        </v-container>
      </div>
    </v-sheet>
  </v-dialog>
</template>
<script setup lang="ts">
import { ref, computed } from "vue";
import { NewsArticle } from "@/types/NewsArticle";
import { Icons } from "@/constants/icons/MdiIcons";

const props = defineProps<{
  article: NewsArticle;
}>();
const dialog = ref(false);
const carouselItems = computed(() =>
  [...props.article.images].sort((image) => +image.background)
);
const sliderImageIndex = ref(0);
</script>
<style lang="scss">
.dialog-bottom-transition-enter-active,
.dialog-bottom-transition-leave-active {
  transition: transform 0.2s ease-in-out;
}
.single-news__background {
  @extend .shadow-bg;
  position: absolute;
  width: 100%;
  height: 100%;
  filter: blur(5px);
  pointer-events: none;
  user-select: none;
  overflow: hidden;
  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: #000;
    opacity: 0.75;
  }
}
.single-news__content {
  position: absolute;
  top: 40px;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.background-image-enter-from,
.background-image-leave-to {
  opacity: 0.2;
}
.background-image-enter-to,
.background-image-leave-from {
  opacity: 1;
}
.background-image-enter-active,
.background-image-leave-active {
  transition: all 0.2s ease-in;
}
</style>
