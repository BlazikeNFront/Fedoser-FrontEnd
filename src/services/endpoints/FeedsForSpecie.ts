import ReadonlyApiService from "@/services/base/ReadOnlyService";
import { FeedForSpecie } from "@/types/Feed";
class FeedsForSpecie extends ReadonlyApiService<FeedForSpecie> {
  constructor() {
    super("feeds-for-species");
  }
}

export default new FeedsForSpecie();
