import { FeedDose, CurrentTankFeed } from "@/types/Feed";
import { TankFeedInformation } from "@/types/Tank";
import {
  TypesOfFeedProgram,
  FeedProgramUpdateFrequency,
} from "@/constants/enums/Feed";

export class FeedInformationDTO implements TankFeedInformation {
  currentFeed: CurrentTankFeed | null;
  usedFeedTotalWeight: number;
  feedProgram: FeedDose[];
  typeOfProgram: TypesOfFeedProgram;
  doseUpdateFrequency: FeedProgramUpdateFrequency | null;
  constructor({
    currentFeed,
    usedFeedTotalWeight,
    feedProgram,
    typeOfProgram,
    doseUpdateFrequency,
  }: Partial<TankFeedInformation>) {
    this.currentFeed = currentFeed || null;
    this.usedFeedTotalWeight = usedFeedTotalWeight || 0;
    this.feedProgram = feedProgram || [];
    this.typeOfProgram = typeOfProgram || 0;
    this.doseUpdateFrequency = doseUpdateFrequency || null;
  }
}
