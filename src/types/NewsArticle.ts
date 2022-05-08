export interface NewsImages {
  master: boolean;
  url: string;
}

export interface NewsArticle {
  header: string;
  content: string;
  images: NewsImages[];
}
