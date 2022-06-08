import { CurrentTankFeed, FeedForSpecie } from "@/types/Feed";

export class CurrentTankFeedDto implements CurrentTankFeed {
  feedForSpecie: FeedForSpecie;
  isProposed: boolean;
  constructor({ feedForSpecie, isProposed }: CurrentTankFeed) {
    this.feedForSpecie = feedForSpecie;
    this.isProposed = isProposed;
  }
}
