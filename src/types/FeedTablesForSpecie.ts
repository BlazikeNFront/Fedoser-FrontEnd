import { Feed } from "./Feed";
import { SpeciesValues } from "@/types/Livestock";
export interface FeedTableSpecie {
  specie: string;
  imageUrl: string;
}

export interface SingleFeedTableForSpecie {
  feed: Feed;
  fcrForSizes: Record<string, number>;
  temperatureFeedDoses: Record<string, number>;
}

export interface FeedTablesForSpecie {
  _id: string;
  specie: SpeciesValues;
  feedTables: SingleFeedTableForSpecie[];
}
