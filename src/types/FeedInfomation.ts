import { FeedProgramUpdateFrequency } from "@/constants/enums/FeedSelect";
import { TypesOfFeedProgram } from "@/constants/enums/FeedSelect";
import { FeedDose } from "./FeedDose";
import { Feed } from "@/types/Feed";
export interface FeedInformation {
  currentFeed: Feed | null;
  usedFeedTotalWeight: number;
  feedProgram: FeedDose[];
  typeOfProgram: TypesOfFeedProgram;
  doseUpdateFrequency: FeedProgramUpdateFrequency | null;
  currentLivestockWeight: number | null;
}
