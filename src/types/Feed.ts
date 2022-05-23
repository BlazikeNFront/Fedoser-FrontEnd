import { FeedQuality } from "@/constants/enums/FeedQuality";
export interface Feed {
  name: string;
  size: string;
  quality: FeedQuality;
  fileName: string;
  _id?: string | null;
}
