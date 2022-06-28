import { DoseTermination } from "@/constants/enums/DoseTermination";
import { FeedDose } from "@/types/Feed";
import { SpeciesValues } from "@/types/Livestock";
export class FeedDoseDTO implements FeedDose {
  number: number;
  amount: number;
  date: string | null;
  temperature: number;
  terminated: DoseTermination;
  weightGainAfterDose: number;
  specie: SpeciesValues;
  constructor(
    feedDose: Omit<Partial<FeedDose>, "specie"> & { specie: SpeciesValues }
  ) {
    const {
      number,
      amount,
      date,
      terminated,
      weightGainAfterDose,
      temperature,
      specie,
    } = feedDose;
    this.number = number || 0;
    this.amount = amount || 0;
    this.temperature = temperature || 0;
    this.date = date || null;
    this.terminated = terminated || 0;
    this.weightGainAfterDose = weightGainAfterDose || 0;
    this.specie = specie;
  }
}
