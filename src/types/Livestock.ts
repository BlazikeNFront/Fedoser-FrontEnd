import { Species } from "@/constants/enums/Species";
import { ChangeSpecieWeightDto } from "./ChangeSpecieWeight";
export interface SingleLivestockSpecie {
  specie: SpeciesValues;
  weight: number;
  meanWeight: number;
  quantity: number;
}

export type SpeciesKeys = keyof typeof Species;
export type SpeciesValues = typeof Species[SpeciesKeys];

export class LivestockInformationDto {
  initial: SingleLivestockSpecie[];
  current: SingleLivestockSpecie[];
  changes: ChangeSpecieWeightDto[];

  constructor({ initial, current, changes }: Partial<LivestockInformationDto>) {
    this.initial = initial || [];
    this.current = current || [];
    this.changes = changes || [];
  }
}
