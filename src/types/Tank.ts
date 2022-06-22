import {
  FeedProgramUpdateFrequency,
  TypesOfFeedProgram,
} from "@/constants/enums/Feed";
import { FeedDose, CurrentTankFeed } from "@/types/Feed";
import { EnviromentalData } from "@/types/EnviromentalData";
import { SingleLivestockSpecie } from "@/types/Livestock";

export interface MainTankInformation {
  name: string;
  volume: number;
  description?: string;
}
export interface TankFeedInformation {
  currentFeed: CurrentTankFeed | null;
  usedFeedTotalWeight: number;
  feedProgram: FeedDose[];
  typeOfProgram: TypesOfFeedProgram;
  doseUpdateFrequency: FeedProgramUpdateFrequency | null;
}

export interface LivestockInformation {
  initial: SingleLivestockSpecie[];
  current: SingleLivestockSpecie[];
}

export interface TankNote {
  id?: string;
  date: string;
  title: string;
  description: string | null;
  enviromentalData: EnviromentalData | null;
  isImportant: boolean;
}
export interface Tank {
  _id?: string;
  mainTankInformation: MainTankInformation;
  annotations: Required<TankNote>[];
  livestockInformation: LivestockInformation;
  feedInformation: TankFeedInformation;
}
