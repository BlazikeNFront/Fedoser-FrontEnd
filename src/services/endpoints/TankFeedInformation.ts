import CrudService from "@/services/base/CrudService";
import { FeedDoseDTO } from "@/utils/DTOs/FeedDose.dto";
import { FeedInformationDTO } from "@/utils/DTOs/FeedInformation.dto";

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

export const TankFeedInformationService = new TankFeedInformation();
export const FeedInformationDoseService = new FeedInformationDose();
