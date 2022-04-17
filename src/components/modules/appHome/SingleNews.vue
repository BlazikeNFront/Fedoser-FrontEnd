<template>
  <v-card class="my-4 px-4 d-flex flex-column single-news" color="light-violet">
    <h4 class="pt-4 pb-2 h-4" v-text="article.header"></h4>

    <p
      class="f-15"
      v-text="showWholeArticle ? article.content : shortArticleText"
    ></p>
    <v-btn
      @click="showWholeArticle = !showWholeArticle"
      class="mb-4 align-self-end f-125"
      color="violet"
      v-text="showWholeArticle ? $t('global.hide') : $t('appHome.showANews')"
    />
  </v-card>
</template>
<script setup lang="ts">
import { ref, computed } from "vue";

const props = defineProps<{
  article: {
    header: string;
    content: string;
  };
}>();
const showWholeArticle = ref(false);
const shortArticleText = computed(
  () => props.article.content.split(" ").slice(0, 30).join(" ") + "..."
);
</script>
<style lang="scss">
.single-news {
  transition: all 0.3s ease-in-out;
  overflow: auto;
}
</style>
