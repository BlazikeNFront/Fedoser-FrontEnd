import ReadonlyApiService from "@/services/base/ReadOnlyService";
import { Feed } from "@/types/Feed";

class FeedsService extends ReadonlyApiService<Required<Feed>> {
  constructor() {
    super("feeds");
  }
}
export default new FeedsService();
