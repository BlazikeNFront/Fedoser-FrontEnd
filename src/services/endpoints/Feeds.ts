import ReadonlyApiService from "@/services/base/ReadOnlyService";
import { FeedDTO } from "@/utils/DTOs/Feed.dto";

class FeedService extends ReadonlyApiService<FeedDTO> {
  constructor() {
    super("feeds");
  }
}

export default new FeedService();
