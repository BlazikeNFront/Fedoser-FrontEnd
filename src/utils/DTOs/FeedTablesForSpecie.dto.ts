import {
  FeedTablesForSpecie,
  SingleFeedTableForSpecie,
} from "@/types/FeedTablesForSpecie";

import { Species } from "@/constants/enums/Species";
export class FeedTablesForSpecieDTO implements FeedTablesForSpecie {
  _id: string;
  specie: Species;
  feedTables: SingleFeedTableForSpecie[];
  constructor(feedEntity: FeedTablesForSpecie) {
    const { _id, specie, feedTables } = feedEntity;
    this._id = _id;
    this.specie = specie;
    this.feedTables = feedTables;
  }
}
