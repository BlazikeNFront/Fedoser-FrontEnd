import { FeedDose, TerminatedFeedDose, WeightsData } from "@/types/Feed";

export class TerminatedFeedDoseDTO implements TerminatedFeedDose {
  feedDose: FeedDose;
  weightsData: WeightsData;
  constructor(feedDose: FeedDose, weightsData: WeightsData) {
    this.feedDose = feedDose;
    this.weightsData = weightsData;
  }
}
