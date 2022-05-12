import ReadonlyApiService from "@/services/base/ReadOnlyService";
import { FeedEntityDTO } from "@/utils/DTOs/FeedEntity.dto";

class FeedEntityService extends ReadonlyApiService<FeedEntityDTO> {
  constructor() {
    super("feeds", true);
  }
}

export default new FeedEntityService();
