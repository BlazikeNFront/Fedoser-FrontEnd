import ReadonlyApiService from "@/services/base/ReadOnlyService";
import { FeedDTO } from "@/utils/DTOs/Feed.dto";

class FeedsForSpecie extends ReadonlyApiService<FeedDTO> {
  constructor() {
    super("feeds-for-specie", true);
  }
}

export default new FeedsForSpecie();
