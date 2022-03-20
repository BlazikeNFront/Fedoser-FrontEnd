import { Tank } from "@/types/Tank";
import { LivestockInformation } from "@/types/Livestock";
import { MainTankInformation } from "@/types/MainTankInformation";
import { FeedInformation } from "@/types/FeedInfomation";
import { TankAnnotation } from "@/types/TankAnnotation";
import { LivestockInformationDTO } from "@/utils/DTOs/LivestockInformation.dto";
import { FeedInformationDTO } from "@/utils/DTOs/FeedInformation.dto";

export class TankDTO {
  _id: string;
  mainTankInformation: MainTankInformation;
  annotations: TankAnnotation[];
  livestockInformation: LivestockInformation;
  feedInformation: FeedInformation;
  constructor(tank: Tank) {
    const {
      _id,
      mainTankInformation,
      livestockInformation,
      feedInformation,
      annotations,
    } = tank;
    this._id = _id || "";
    this.mainTankInformation = mainTankInformation;
    this.livestockInformation =
      livestockInformation || new LivestockInformationDTO({});
    this.feedInformation = feedInformation || new FeedInformationDTO({});
    this.annotations = annotations || [];
  }
}
