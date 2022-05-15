import { computed } from "vue";
import { NewsArticle } from "@/types/NewsArticle";
export default function useSingleNews(news: NewsArticle) {
  const backgroundImage = computed(
    () =>
      news.images.find((image) => image.background) || {
        url: "https://picsum.photos/1920/1080?random",
      }
  );
  return { backgroundImage };
}
