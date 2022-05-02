import { FeedDose } from "@/types/FeedDose";
import {
  TerminatedFeedDose,
  WeightsData,
} from "@/types/TerminatedFeedDose.dto";
export class TerminatedFeedDoseDTO implements TerminatedFeedDose {
  feedDose: FeedDose;
  weightsData: WeightsData;
  constructor(feedDose: FeedDose, weightsData: WeightsData) {
    this.feedDose = feedDose;
    this.weightsData = weightsData;
  }
}
