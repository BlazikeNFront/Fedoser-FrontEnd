import CrudService from "@/services/base/CrudService";
import { LivestockInformationDTO } from "@/utils/DTOs/LivestockInformation.dto";
import { ChangeSpecieWeightDto } from "@/utils/DTOs/ChangeSpecieWeight.dto";
class TankLivestockInformation extends CrudService<LivestockInformationDTO> {
  constructor() {
    super("tank-livestock");
  }
}
class TankCurrentLivestock extends CrudService<ChangeSpecieWeightDto> {
  constructor() {
    super("tank-livestock/currentLivestock");
  }
}
export default new TankLivestockInformation();
export const TankCurrentLivestockService = new TankCurrentLivestock();
