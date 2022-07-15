import { FeedQuality } from "@/constants/enums/Feed";
import { SpeciesValues } from "./Livestock";
import { DoseTermination } from "@/constants/enums/DoseTermination";
import {
  TypesOfFeedProgram,
  FeedProgramUpdateFrequency,
} from "@/constants/enums/Feed";
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

export class FeedDoseDto {
  number: number;
  amount: number;
  date: string | null;
  temperature: number | null;
  terminated: DoseTermination;
  weightGainAfterDose: number;
  currentCycleDoseNumber: number;
  specie: SpeciesValues;
  constructor(
    feedDose: Omit<
      Partial<FeedDoseDto>,
      "specie" | "terminated" | "currentCycleDoseNumber"
    > & {
      specie: SpeciesValues;
      terminated: DoseTermination;
      currentCycleDoseNumber: number;
    }
  ) {
    const {
      number,
      amount,
      date,
      terminated,
      weightGainAfterDose,
      temperature,
      specie,
      currentCycleDoseNumber,
    } = feedDose;
    this.number = number || 0;
    this.amount = amount || 0;
    this.temperature = temperature || null;
    this.date = date || null;
    this.terminated = terminated;
    this.weightGainAfterDose = weightGainAfterDose || 0;
    this.currentCycleDoseNumber = currentCycleDoseNumber;
    this.specie = specie;
  }
}
export class CurrentTankFeedDto {
  constructor(
    readonly feedForSpecie: FeedForSpecie,
    readonly isProposed: boolean
  ) {}
}
export class FeedInformationDto {
  currentFeed: CurrentTankFeedDto | null;
  usedFeedTotalWeight: number;
  feedProgram: FeedDoseDto[];
  typeOfProgram: TypesOfFeedProgram;
  doseUpdateFrequency: FeedProgramUpdateFrequency | null;
  constructor({
    currentFeed,
    usedFeedTotalWeight,
    feedProgram,
    typeOfProgram,
    doseUpdateFrequency,
  }: Partial<FeedInformationDto>) {
    this.currentFeed = currentFeed || null;
    this.usedFeedTotalWeight = usedFeedTotalWeight || 0;
    this.feedProgram = feedProgram || [];
    this.typeOfProgram = typeOfProgram || 0;
    this.doseUpdateFrequency = doseUpdateFrequency || null;
  }
}
