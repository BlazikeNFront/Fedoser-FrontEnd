import { FeedInformationDto } from "@/types/Feed";

import { NoteDto } from "@/types/Note";
import { LivestockInformationDto } from "@/types/Livestock";
export interface MainTankInformation {
  name: string;
  volume: number;
  description?: string;
}

export class TankDto {
  _id: string;
  mainTankInformation: MainTankInformation;
  annotations: Required<NoteDto>[];
  livestockInformation: LivestockInformationDto;
  feedInformation: FeedInformationDto;
  history: Pick<TankDto, "livestockInformation" | "feedInformation">[];
  constructor(
    tank: Partial<TankDto> & { mainTankInformation: MainTankInformation }
  ) {
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
      livestockInformation || new LivestockInformationDto({});
    this.feedInformation = feedInformation || new FeedInformationDto({});
    this.annotations = annotations || [];
    this.history = history || [];
  }
}
