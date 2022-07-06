import CrudService from "@/services/base/CrudService";
import { FeedInformationDTO } from "@/utils/DTOs/FeedInformation.dto";
import { CurrentTankFeedDto } from "@/utils/DTOs/CurrentTankFeed.dto";
import { FeedDoseDTO } from "@/utils/DTOs/FeedDose.dto";
import { Tank } from "@/types/Tank";

class TankFeedInformation extends CrudService<FeedInformationDTO> {
  constructor() {
    super("tank-feed-information");
  }
}
class FeedInformationDose extends CrudService<FeedDoseDTO> {
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
  Pick<Tank, "feedInformation" | "livestockInformation">
> {
  constructor() {
    super("tank-feed-information/end-feed-program");
  }
}
export const TankFeedInformationService = new TankFeedInformation();
export const FeedInformationDoseService = new FeedInformationDose();
export const TankCurrentFeeService = new TankCurrentFeed();
export const EndFeedProgramService = new EndFeedProgram();
