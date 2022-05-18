import { FeedQuality } from "@/constants/enums/FeedQuality";
import { Species } from "@/constants/enums/Species";
export interface FeedTableSpecie {
  specie: string;
  imageUrl: string;
}

export interface SingleFeedTableForSpecie {
  feedName: string;
  size: string;
  quality: FeedQuality;
  fileName: string;
}
export interface FeedTablesForSpecie {
  _id: string;
  specie: Species;
  feedTables: SingleFeedTableForSpecie[];
}
