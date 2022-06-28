import CrudService from "@/services/base/CrudService";
import { FeedInformationDTO } from "@/utils/DTOs/FeedInformation.dto";

import { CurrentTankFeedDto } from "@/utils/DTOs/CurrentTankFeed.dto";
import { FeedDoseDTO } from "@/utils/DTOs/FeedDose.dto";
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
export const TankFeedInformationService = new TankFeedInformation();
export const FeedInformationDoseService = new FeedInformationDose();
export const TankCurrentFeeService = new TankCurrentFeed();
