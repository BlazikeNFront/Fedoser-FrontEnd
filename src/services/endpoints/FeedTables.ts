import ReadonlyApiService from "@/services/base/ReadOnlyService";
import { FeedTablesForSpecieDTO } from "@/utils/DTOs/FeedTablesForSpecie.dto";

class FeedTablesService extends ReadonlyApiService<FeedTablesForSpecieDTO> {
  constructor() {
    super("feedTables", true);
  }
}

export default new FeedTablesService();
