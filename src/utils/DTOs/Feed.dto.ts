import { Feed } from "@/types/Feed";
import { FeedQuality } from "@/constants/enums/FeedQuality";

export class FeedDTO implements Feed {
  name: string;
  size: string;
  quality: FeedQuality;
  fileName: string;
  _id?: string | null;
  constructor(feedEntity: Feed) {
    const { _id, name, size, quality, fileName } = feedEntity;
    this._id = _id || null;
    this.name = name;
    this.size = size;
    this.quality = quality;
    this.fileName = fileName;
  }
}
