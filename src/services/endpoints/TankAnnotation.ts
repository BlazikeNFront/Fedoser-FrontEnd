import CrudService from "@/services/base/CrudService";
import { TankAnnotationDTO } from "@/utils/DTOs/TankAnnotation.dto";

class TankService extends CrudService<TankAnnotationDTO> {
  constructor() {
    super("tank-annotations");
  }
}

export default new TankService();
