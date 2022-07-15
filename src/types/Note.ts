import { EnviromentalData } from "@/types/EnviromentalData";
import { getCurrentDate } from "@/helpers/date";
export class NoteDto {
  date: string;
  title: string;
  description: string | null;
  enviromentalData: EnviromentalData | null;
  isImportant: boolean;
  id?: string;

  constructor(tankNote: Partial<NoteDto>) {
    const { id, date, title, description, enviromentalData, isImportant } =
      tankNote;
    this.id = id;
    this.date = date || getCurrentDate();
    this.title = title || "";
    this.description = description || "";
    this.enviromentalData = enviromentalData || null;
    this.isImportant = isImportant || false;
  }
}
