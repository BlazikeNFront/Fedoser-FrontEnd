import { DateTime } from "luxon";

export const getCurrentDate = (): string => {
  return DateTime.now().toFormat("yyyy-MM-dd");
};
