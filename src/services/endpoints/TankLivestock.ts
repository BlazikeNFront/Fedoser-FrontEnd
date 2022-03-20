import CrudService from "@/services/base/CrudService";
import { FeedInformationDTO } from "@/utils/DTOs/FeedInformation.dto";

class TankFeedInformation extends CrudService<FeedInformationDTO> {
  constructor() {
    super("tank-livestock");
  }
}

export default new TankFeedInformation();
