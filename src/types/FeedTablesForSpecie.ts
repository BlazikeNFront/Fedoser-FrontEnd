import { Feed } from "./Feed";
import { SpeciesValues } from "@/types/Livestock";
export interface FeedTableSpecie {
  specie: string;
  imageUrl: string;
}

export interface SingleFeedTableForSpecie {
  feedId: string;
  fcrForSizes: Record<string, number>;
  temperatureFeedDoses: Record<string, number>;
}

export interface SingleFeedTableForSpecieWithFeedDetails
  extends SingleFeedTableForSpecie,
    Feed {}

export interface FeedTablesForSpecie<T = SingleFeedTableForSpecie[]> {
  _id: string;
  specie: SpeciesValues;
  feedTables: T;
}
