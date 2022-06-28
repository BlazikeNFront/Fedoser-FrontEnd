import { FeedQuality } from "@/constants/enums/Feed";
import { SpeciesValues } from "./Livestock";
import { DoseTermination } from "@/constants/enums/DoseTermination";

export interface Feed {
  _id: string;
  name: string;
  sizes: string[];
  speciesWithFeedTables: SpeciesValues[];
  quality: FeedQuality;
  filename: string;
}

export interface FeedForSpecie {
  _id: string;
  feed: Feed;
  specie: SpeciesValues;
  minSize: number;
  maxSize: null | number;
  fcr: number;
  size: string;
  weightBreakpoints: Record<string, number> | null;
}

export interface FeedDose {
  number: number;
  amount: number;
  date: string | null;
  temperature: number;
  terminated: DoseTermination;
  weightGainAfterDose: number;
  specie: SpeciesValues;
}

export interface TerminatedFeedDose {
  feedDose: FeedDose;
}
export interface CurrentTankFeed {
  feedForSpecie: FeedForSpecie;
  isProposed: boolean;
}
