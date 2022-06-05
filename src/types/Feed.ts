import { FeedQuality } from "@/constants/enums/Feed";

import { DoseTermination } from "@/constants/enums/DoseTermination";

export interface FeedType {
  name: string;
  size: string;
  quality: FeedQuality;
  fileName: string;
  _id?: string | null;
}
export interface Feed {
  _id: string;
  feedType: Required<FeedType>;
  size: string;
  minWeight: number | null;
  maxWeight: number | null;
  fcr: number;
}
export interface FeedDose {
  number: number;
  amount: number;
  date: string | null;
  temperature: number;
  terminated: DoseTermination;
  weightGainAfterDose: number;
}

export interface WeightsData {
  currentLivestockWeight: number;
  usedFeedTotalWeight: number;
}
export interface TerminatedFeedDose {
  feedDose: FeedDose;
  weightsData: WeightsData;
}
export interface CurrentTankFeed {
  feed: Feed;
  size: string;
  isProposed: boolean;
}
