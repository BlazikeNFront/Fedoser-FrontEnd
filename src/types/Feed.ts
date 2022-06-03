import { FeedQuality } from "@/constants/enums/Feed";

import { DoseTermination } from "@/constants/enums/DoseTermination";

export interface Feed {
  name: string;
  size: string;
  quality: FeedQuality;
  fileName: string;
  _id?: string | null;
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
