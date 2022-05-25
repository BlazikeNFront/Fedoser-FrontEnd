import { Species } from "@/constants/enums/Species";
export interface SingleLivestockSpecie {
  specie: SpeciesValues;
  weight: number;
  meanWeight: number;
  quantity: number;
  customSpecie?: string;
}

export type SpeciesKeys = keyof typeof Species;
export type SpeciesValues = typeof Species[SpeciesKeys];
