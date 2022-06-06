import ReadonlyApiService from "@/services/base/ReadOnlyService";
import { FeedsForSpecieDto } from "@/utils/DTOs/FeedsForSpecie.dto";
class FeedsForSpecie extends ReadonlyApiService<FeedsForSpecieDto> {
  constructor() {
    super("feeds-for-specie");
  }
}

export default new FeedsForSpecie();
