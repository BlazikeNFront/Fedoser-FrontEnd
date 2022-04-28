import { EnviromentalData } from "@/types/EnviromentalData";

export interface TankNote {
  id?: string;
  date: string;
  title: string;
  description: string | null;
  enviromentalData: EnviromentalData | null;
  isImportant: boolean;
}
