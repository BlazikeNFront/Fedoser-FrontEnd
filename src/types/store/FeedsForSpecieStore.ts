import { FeedForSpecie } from "@/types/Feed";
import { SpeciesValues } from "../Livestock";
export interface FeedsForSpecieStore {
  feedsForSpecie: FeedForSpecie[] | null;
  specie: SpeciesValues | null;
  loader: boolean;
}
