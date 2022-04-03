import ReadOnlyService from "@/services/base/ReadOnlyService";
import { TankActionDTO } from "@/utils/DTOs/TankAction.dto";
class TankService extends ReadOnlyService<TankActionDTO> {
  constructor() {
    super("tank-actions");
  }
}

export default new TankService();
