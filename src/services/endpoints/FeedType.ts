import ReadonlyApiService from "@/services/base/ReadOnlyService";
import { FeedTypeDTO } from "@/utils/DTOs/FeedType.dto";

class FeedTypeService extends ReadonlyApiService<FeedTypeDTO> {
  constructor() {
    super("feeds-type");
  }
}

export default new FeedTypeService();
