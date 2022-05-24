import { Feed, FeedDose } from "@/types/Feed";
import { TankFeedInformation } from "@/types/Tank";
import {
  TypesOfFeedProgram,
  FeedProgramUpdateFrequency,
} from "@/constants/enums/Feed";

export class FeedInformationDTO implements TankFeedInformation {
  currentFeed: Feed | null;
  usedFeedTotalWeight: number;
  feedProgram: FeedDose[];
  typeOfProgram: TypesOfFeedProgram;
  doseUpdateFrequency: FeedProgramUpdateFrequency | null;
  currentLivestockWeight: number | null;
  constructor(feedInformation: Partial<TankFeedInformation>) {
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
