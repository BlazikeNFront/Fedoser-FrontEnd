import { EnviromentalData } from "@/types/EnviromentalData";
import { TankAnnotation } from "@/types/TankAnnotation";
export class TankAnnotationDTO implements TankAnnotation {
  id?: string;
  date: string;
  title: string;
  description: string | null;
  enviromentalData: EnviromentalData | null;
  isImportant: boolean;

  constructor(tankAnnotation: TankAnnotation) {
    const { id, date, title, description, enviromentalData, isImportant } =
      tankAnnotation;
    this.id = id;
    this.date = date;
    this.title = title;
    this.description = description;
    this.enviromentalData = enviromentalData || null;
    this.isImportant = isImportant || false;
  }
}
