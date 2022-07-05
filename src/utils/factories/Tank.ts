import { LivestockInformation, TankFeedInformation } from "@/types/Tank";
import { TypesOfFeedProgram } from "@/constants/enums/Feed";
export const emptyTankLivestock = (): LivestockInformation => ({
  initial: [],
  current: [],
  changes: [],
});
export const emptyTankFeedInformation = (): TankFeedInformation => ({
  currentFeed: null,
  usedFeedTotalWeight: 0,
  feedProgram: [],
  typeOfProgram: TypesOfFeedProgram.UNSELECTED,
  doseUpdateFrequency: null,
});
