import { FeedEntity } from "@/types/FeedEntity";
import { FeedTypes } from "@/constants/enums/FeedTypes";
export class FeedEntityDTO implements FeedEntity {
  _id: string;
  pelletSize: string;
  fullName: string;
  feedType: FeedTypes;
  constructor(feedEntity: FeedEntity) {
    const { _id, pelletSize, fullName, feedType } = feedEntity;
    this._id = _id;
    this.pelletSize = pelletSize;
    this.fullName = fullName;
    this.feedType = feedType;
  }
}
