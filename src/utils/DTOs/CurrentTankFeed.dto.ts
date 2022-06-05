import { CurrentTankFeed, Feed } from "@/types/Feed";

export class CurrentTankFeedDto implements CurrentTankFeed {
  feed: Feed;
  size: string;
  isProposed: boolean;
  constructor({ feed, size, isProposed }: CurrentTankFeed) {
    this.feed = feed;
    this.size = size;
    this.isProposed = isProposed;
  }
}
