import ReadonlyApiService from "@/services/base/ReadOnlyService";
import BaseApiService from "@/services/base/BaseService";
import { FeedTablesForSpecieDTO } from "@/utils/DTOs/FeedTablesForSpecie.dto";

class FeedTablesDataService extends ReadonlyApiService<FeedTablesForSpecieDTO> {
  constructor() {
    super("feeds/feedTables", true);
  }
}
class FeedTablesPdfDataService extends ReadonlyApiService<Blob> {
  constructor() {
    super("feeds/feedTables");
  }
}

export const FeedTablesService = new FeedTablesDataService();
export const FeedTablesPdfService = new FeedTablesPdfDataService();
