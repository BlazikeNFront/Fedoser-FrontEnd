import { FeedType } from "@/types/Feed";
export interface FeedTypesStore {
  feeds: Required<FeedType>[];
  loadingFeeds: boolean;
}
