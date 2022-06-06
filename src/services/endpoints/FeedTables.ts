import ReadonlyApiService from "@/services/base/ReadOnlyService";

import { FeedTablesForSpecieDTO } from "@/utils/DTOs/FeedTablesForSpecie.dto";

class FeedTablesDataService extends ReadonlyApiService<FeedTablesForSpecieDTO> {
  constructor() {
    super("feedTables");
  }
}
class FeedTablesPdfDataService extends ReadonlyApiService<Blob> {
  constructor() {
    super("feedTables");
  }
}

export const FeedTablesService = new FeedTablesDataService();
export const FeedTablesPdfService = new FeedTablesPdfDataService();
