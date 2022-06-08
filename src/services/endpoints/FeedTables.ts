import ReadonlyApiService from "@/services/base/ReadOnlyService";

class FeedTablesPdfDataService extends ReadonlyApiService<Blob> {
  constructor() {
    super("feed-tables");
  }
}

export const FeedTablesPdfService = new FeedTablesPdfDataService();
