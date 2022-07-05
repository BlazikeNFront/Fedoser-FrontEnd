import { Tank } from "@/types/Tank";
import {
  LivestockInformation,
  MainTankInformation,
  TankFeedInformation,
  TankNote,
} from "@/types/Tank";

import { LivestockInformationDTO } from "@/utils/DTOs/LivestockInformation.dto";
import { FeedInformationDTO } from "@/utils/DTOs/FeedInformation.dto";

export class TankDTO {
  _id: string;
  mainTankInformation: MainTankInformation;
  annotations: Required<TankNote>[];
  livestockInformation: LivestockInformation;
  feedInformation: TankFeedInformation;
  history: Pick<Tank, "livestockInformation" | "feedInformation">[];
  constructor(tank: Tank) {
    const {
      _id,
      mainTankInformation,
      livestockInformation,
      feedInformation,
      annotations,
      history,
    } = tank;
    this._id = _id || "";
    this.mainTankInformation = mainTankInformation;
    this.livestockInformation =
      livestockInformation || new LivestockInformationDTO({});
    this.feedInformation = feedInformation || new FeedInformationDTO({});
    this.annotations = annotations || [];
    this.history = history || [];
  }
}
