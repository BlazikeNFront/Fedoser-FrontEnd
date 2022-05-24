import { DoseTermination } from "@/constants/enums/DoseTermination";
import { FeedDose } from "@/types/Feed";
export class FeedDoseDTO implements FeedDose {
  number: number;
  amount: number;
  date: string | null;
  temperature: number;
  terminated: DoseTermination;
  weightGainAfterDose: number;
  constructor(feedDose: Partial<FeedDose>) {
    const {
      number,
      amount,
      date,
      terminated,
      weightGainAfterDose,
      temperature,
    } = feedDose;
    this.number = number || 0;
    this.amount = amount || 0;
    this.temperature = temperature || 0;
    this.date = date || null;
    this.terminated = terminated || 0;
    this.weightGainAfterDose = weightGainAfterDose || 0;
  }
}
