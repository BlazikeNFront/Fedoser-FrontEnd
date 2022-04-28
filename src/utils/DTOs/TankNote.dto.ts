import { EnviromentalData } from "@/types/EnviromentalData";
import { TankNote } from "@/types/TankAnnotation";
export class TankNoteDto implements TankNote {
  id?: string;
  date: string;
  title: string;
  description: string | null;
  enviromentalData: EnviromentalData | null;
  isImportant: boolean;

  constructor(tankNote: TankNote) {
    const { id, date, title, description, enviromentalData, isImportant } =
      tankNote;
    console.log(enviromentalData);
    this.id = id;
    this.date = date;
    this.title = title;
    this.description = description;
    this.enviromentalData = enviromentalData || null;
    this.isImportant = isImportant || false;
  }
}
