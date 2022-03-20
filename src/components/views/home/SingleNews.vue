<template>
  <article class="single-news">
    <h4>{{ article.header }}</h4>
    <p>{{ showWholeArticle ? article.content : shortArticleText }}</p>
    <button @click="showWholeArticle = !showWholeArticle">
      {{ showWholeArticle ? "Hide article" : "Show article" }}
    </button>
  </article>
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
  () => props.article.content.split(" ").slice(0, 25).join(" ") + "..."
);
</script>
<style scoped lang="scss">
article {
  margin: 2rem 3rem;
  background-color: $primary-color-dark;
  padding: 1rem 2rem;
  border-radius: 25px;
  h4 {
    text-align: left;
  }
  p {
    text-align: justify;
    font-size: 1.5rem;
  }
  button {
    margin-left: auto;
  }
}
</style>
