import CrudService from "@/services/base/CrudService";
import { FeedInformationDto } from "@/types/Feed";
import { CurrentTankFeedDto } from "@/types/Feed";
import { FeedDoseDto } from "@/types/Feed";
import { TankDto } from "@/types/Tank";

class TankFeedInformation extends CrudService<FeedInformationDto> {
  constructor() {
    super("tank-feed-information");
  }
}
class FeedInformationDose extends CrudService<FeedDoseDto> {
  constructor() {
    super("tank-feed-information");
  }
}
class TankCurrentFeed extends CrudService<CurrentTankFeedDto> {
  constructor() {
    super("tank-feed-information");
  }
}
class EndFeedProgram extends CrudService<
  Pick<TankDto, "feedInformation" | "livestockInformation">
> {
  constructor() {
    super("tank-feed-information/end-feed-program");
  }
}
export const TankFeedInformationService = new TankFeedInformation();
export const FeedInformationDoseService = new FeedInformationDose();
export const TankCurrentFeeService = new TankCurrentFeed();
export const EndFeedProgramService = new EndFeedProgram();
