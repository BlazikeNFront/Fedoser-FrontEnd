import { DateTime } from "luxon";

export const getCurrentDate = (): string =>
  DateTime.now().toFormat("yyyy-MM-dd");

export const getCurrentDateInMs = (): number => DateTime.now().toMillis();
