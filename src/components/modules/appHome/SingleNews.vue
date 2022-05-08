<template>
  <v-card
    class="my-2 px-4 text-white single-news"
    :style="`border: 2px solid rgb(var(--v-theme-violet));
      background-image: url(${masterImage.url});`"
    rounded
  >
    <div class="w-100 h-100 single-news__img-filter"></div>
    <div
      class="w-100 h-100 d-flex flex-column justify-end single-news__text-wrapper"
    >
      <h4 class="pt-4 pb-2 h-4" v-text="article.header"></h4>

      <p
        class="f-15 text-justify"
        v-text="showWholeArticle ? article.content : shortArticleText"
      ></p>
      <div class="my-2 d-flex align-center justify-end">
        <v-btn
          @click="showWholeArticle = !showWholeArticle"
          class="align-self-end f-15 font-weight-bold text-light-blue shadow-bg"
          text
          v-text="
            showWholeArticle ? $t('global.hide') : $t('appHome.showANews')
          "
        />
      </div>
    </div>
  </v-card>
</template>
<script setup lang="ts">
import { ref, computed } from "vue";
import { NewsImages } from "@/types/NewsArticle";
const props = defineProps<{
  article: {
    header: string;
    content: string;
    images: NewsImages[];
  };
}>();
const showWholeArticle = ref(false);
const masterImage = computed(
  () =>
    props.article.images.find((image) => image.master) || {
      url: "https://picsum.photos/1920/1080?random",
    }
);

const shortArticleText = computed(
  () => props.article.content.split(" ").slice(0, 20).join(" ") + "..."
);
</script>
<style lang="scss">
.single-news {
  height: 300px;
  &__img-filter {
    position: absolute;
    top: 0;
    left: 0;
    background: #024564;
    mix-blend-mode: overlay;
  }
  &__text-wrapper {
  }
}
</style>
