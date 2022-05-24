import { getCurrentDate } from "@/helpers/date";
import { TankNote } from "@/types/Tank";

export function tankNoteFactory(): TankNote {
  return {
    date: getCurrentDate(),
    title: "Annotation Title",
    description: null,
    enviromentalData: null,
    isImportant: false,
  };
}
