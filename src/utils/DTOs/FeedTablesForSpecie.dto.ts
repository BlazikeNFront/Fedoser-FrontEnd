import {
  FeedTablesForSpecie,
  SingleFeedTableForSpecie,
} from "@/types/FeedTablesForSpecie";

import { SpeciesValues } from "@/types/Livestock";
export class FeedTablesForSpecieDTO implements FeedTablesForSpecie {
  _id: string;
  specie: SpeciesValues;
  feedTables: SingleFeedTableForSpecie[];
  constructor({ _id, specie, feedTables }: FeedTablesForSpecie) {
    this._id = _id;
    this.specie = specie;
    this.feedTables = feedTables;
  }
}
