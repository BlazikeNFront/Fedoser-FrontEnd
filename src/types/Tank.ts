import { LivestockInformation } from "@/types/Livestock";
import { MainTankInformation } from "@/types/MainTankInformation";
import { FeedInformation } from "@/types/FeedInfomation";
import { TankAnnotation } from "@/types/TankAnnotation";

export interface Tank {
  _id?: string;
  mainTankInformation: MainTankInformation;
  annotations: TankAnnotation[];
  livestockInformation: LivestockInformation;
  feedInformation: FeedInformation;
}
