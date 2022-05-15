<template>
  <v-card
    class="my-2 px-4 text-white single-news"
    :style="`border: 2px solid rgb(var(--v-theme-violet));
      background-image: url(${backgroundImage.url});background-size: cover;`"
    rounded
  >
    <div class="w-100 h-100 single-news__img-filter"></div>
    <div
      class="w-100 h-100 d-flex flex-column justify-end single-news__text-wrapper"
    >
      <h4 class="pt-4 pb-2 h-4" v-text="article.header"></h4>

      <p class="f-15 text-justify" v-text="shortArticleText"></p>
      <div class="my-2 d-flex align-center justify-end">
        <single-news-display :article="article" />
      </div>
    </div>
  </v-card>
</template>
<script setup lang="ts">
import { computed } from "vue";
import { NewsArticle } from "@/types/NewsArticle";
import SingleNewsDisplay from "@/components/modules/appHome/SingleNewsDisplay.vue";
import useSingleNews from "@/hooks/useSingleNews";
const props = defineProps<{
  article: NewsArticle;
}>();
const { backgroundImage } = useSingleNews(props.article);
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
