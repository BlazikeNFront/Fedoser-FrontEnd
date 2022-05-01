import { Feed } from "@/types/Feed";
import { FeedInformation } from "@/types/FeedInfomation";
import { FeedDose } from "@/types/FeedDose";
import { TypesOfFeedProgram } from "@/constants/enums/FeedSelect";
import { FeedProgramUpdateFrequency } from "@/constants/enums/FeedSelect";
export class FeedInformationDTO implements FeedInformation {
  currentFeed: Feed | null;
  usedFeedTotalWeight: number;
  feedProgram: FeedDose[];
  typeOfProgram: TypesOfFeedProgram;
  doseUpdateFrequency: FeedProgramUpdateFrequency | null;
  currentLivestockWeight: number | null;
  constructor(feedInformation: Partial<FeedInformation>) {
    const {
      currentFeed,
      usedFeedTotalWeight,
      feedProgram,
      typeOfProgram,
      doseUpdateFrequency,
      currentLivestockWeight,
    } = feedInformation;
    this.currentFeed = currentFeed || null;
    this.usedFeedTotalWeight = usedFeedTotalWeight || 0;
    this.feedProgram = feedProgram || [];
    this.typeOfProgram = typeOfProgram || 0;
    this.doseUpdateFrequency = doseUpdateFrequency || null;
    this.currentLivestockWeight = currentLivestockWeight || null;
  }
}
