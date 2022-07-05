import { DoseTermination } from "@/constants/enums/DoseTermination";
import { FeedDose } from "@/types/Feed";
import { SpeciesValues } from "@/types/Livestock";
export class FeedDoseDTO implements FeedDose {
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
      Partial<FeedDose>,
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
