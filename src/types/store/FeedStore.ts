import { Feed } from "@/types/Feed";
export interface FeedStore {
  feeds: Required<Feed>[];
  loadingFeeds: boolean;
}
