<template>
  <v-sheet
    flat
    tag="section"
    class="px-2 d-flex flex-column"
    color="transparent"
  >
    <h3 class="h-3 text-center" v-text="$t('appHome.news')"></h3>
    <single-news
      v-for="(article, index) in news"
      :key="index"
      :article="article"
    />
  </v-sheet>
</template>
<script setup lang="ts">
import SingleNews from "@/components/modules/appHome/SingleNews.vue";
import { NewsArticle } from "@/types/NewsArticle";
const news: NewsArticle[] = [
  {
    header: "Article header",
    images: [
      {
        background: true,
        url: require("@/assets/placeholders/newsBackground.jpg"),
      },
      {
        background: false,
        url: require("@/assets/placeholders/newsBackground-1.jpg"),
      },
      {
        background: false,
        url: require("@/assets/placeholders/newsBackground-2.jpg"),
      },
    ],
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    header: "Article header",
    images: [
      {
        background: true,
        url: require("@/assets/placeholders/newsBackground.jpg"),
      },
      {
        background: false,
        url: require("@/assets/placeholders/newsBackground-1.jpg"),
      },
      {
        background: false,
        url: require("@/assets/placeholders/newsBackground-2.jpg"),
      },
    ],
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    header: "Article header",
    images: [
      {
        background: true,
        url: require("@/assets/placeholders/newsBackground.jpg"),
      },
      {
        background: false,
        url: require("@/assets/placeholders/newsBackground-1.jpg"),
      },
      {
        background: false,
        url: require("@/assets/placeholders/newsBackground-2.jpg"),
      },
    ],
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
];
</script>
