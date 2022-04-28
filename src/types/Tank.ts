import { LivestockInformation } from "@/types/Livestock";
import { MainTankInformation } from "@/types/MainTankInformation";
import { FeedInformation } from "@/types/FeedInfomation";
import { TankNote } from "@/types/TankAnnotation";

export interface Tank {
  _id?: string;
  mainTankInformation: MainTankInformation;
  annotations: TankNote[];
  livestockInformation: LivestockInformation;
  feedInformation: FeedInformation;
}
