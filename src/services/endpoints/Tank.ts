import CrudService from "@/services/base/CrudService";
import { TankDto } from "@/types/Tank";

class TankService extends CrudService<TankDto> {
  constructor() {
    super("tanks");
  }
}

export default new TankService();
