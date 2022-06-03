import { Feed } from "@/types/Feed";
import { FeedQuality } from "@/constants/enums/Feed";

export class FeedDTO implements Feed {
  name: string;
  size: string;
  quality: FeedQuality;
  fileName: string;
  _id?: string | null;
  constructor(Feed: Feed) {
    const { _id, name, size, quality, fileName } = Feed;
    this._id = _id || null;
    this.name = name;
    this.size = size;
    this.quality = quality;
    this.fileName = fileName;
  }
}
