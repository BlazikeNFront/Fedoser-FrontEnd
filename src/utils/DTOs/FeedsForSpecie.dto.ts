import { FeedsForSpecie, WeightBreakpoints } from "@/types/FeedsForSpecie";
import { SpeciesValues } from "@/types/Livestock";

export class FeedsForSpecieDto implements FeedsForSpecie {
  readonly _id: string;
  readonly specie: SpeciesValues;
  readonly weightBreakpoints: WeightBreakpoints[];
  constructor({ _id, specie, weightBreakpoints }: FeedsForSpecie) {
    this._id = _id;
    this.specie = specie;
    this.weightBreakpoints = weightBreakpoints;
  }
}
