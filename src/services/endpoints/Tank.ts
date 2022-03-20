import CrudService from "@/services/base/CrudService";
import { TankDTO } from "@/utils/DTOs/Tank.dto";

class TankService extends CrudService<TankDTO> {
  constructor() {
    super("tanks");
  }
}

export default new TankService();
