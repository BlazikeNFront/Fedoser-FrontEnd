import { getCurrentDate } from "@/helpers/date";
import { TankNote } from "@/types/TankAnnotation";

export function tankNoteFactory(): TankNote {
  return {
    date: getCurrentDate(),
    title: "Annotation Title",
    description: null,
    enviromentalData: null,
    isImportant: false,
  };
}
