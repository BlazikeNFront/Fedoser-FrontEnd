import { FeedDose } from "@/types/FeedDose";
export interface WeightsData {
  currentLivestockWeight: number;
  usedFeedTotalWeight: number;
}
export interface TerminatedFeedDose {
  feedDose: FeedDose;
  weightsData: WeightsData;
}
