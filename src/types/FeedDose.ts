import { DoseTermination } from "@/constants/enums/DoseTermination";
export interface FeedDose {
  number: number;
  amount: number;
  date: string | null;
  temperature: number;
  terminated: DoseTermination;
  weightGainAfterDose: number;
}
