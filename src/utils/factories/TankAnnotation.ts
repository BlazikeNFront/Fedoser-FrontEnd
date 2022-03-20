import { getCurrentDate } from "@/helpers/date";
import { TankAnnotation } from "@/types/TankAnnotation";

export function tankAnnotationFactory(): TankAnnotation {
  return {
    date: getCurrentDate(),
    title: "Annotation Title",
    description: null,
    enviromentalData: null,
    isImportant: false,
  };
}
