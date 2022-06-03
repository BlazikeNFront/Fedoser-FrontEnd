import { Feed } from "./Feed";
import { SpeciesValues } from "./Livestock";

export interface WeightBreakpoints {
  size: number;
  feeds: Required<Feed>[];
}

export interface FeedsForSpecie {
  _id: string;
  specie: SpeciesValues;
  weightBreakpoints: WeightBreakpoints[];
}
