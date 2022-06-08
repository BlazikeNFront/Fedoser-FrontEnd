import ReadonlyApiService from "@/services/base/ReadOnlyService";
import { Feed } from "@/types/Feed";

class FeedsService extends ReadonlyApiService<Feed> {
  constructor() {
    super("feeds");
  }
}
export default new FeedsService();
