import CrudService from "@/services/base/CrudService";
import {LivestockInformationDTO} from '@/utils/DTOs/LivestockInformation.dto'

class TankLivestockInformation extends CrudService<LivestockInformationDTO> {
  constructor() {
    super("tank-livestock");
  }
}

export default new TankLivestockInformation();
