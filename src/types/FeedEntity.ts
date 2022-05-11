import { FeedTypes } from "@/constants/enums/FeedTypes";
export interface FeedEntity {
  _id: string;
  pelletSize: string;
  fullName: string;
  feedType: FeedTypes;
}
