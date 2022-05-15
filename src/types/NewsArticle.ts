export interface NewsImages {
  background: boolean;
  url: string;
}

export interface NewsArticle {
  header: string;
  content: string;
  images: NewsImages[];
}
