import CrudService from "@/services/base/CrudService";
import { LivestockInformationDto } from "@/types/Livestock";
import { ChangeSpecieWeightDto } from "@/types/ChangeSpecieWeight";
class TankLivestockInformation extends CrudService<LivestockInformationDto> {
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
