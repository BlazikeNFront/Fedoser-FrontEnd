import { Weather } from "@/constants/enums/Weather";

export interface EnviromentalData {
  temperature: number | null;
  ph: number | null;
  ammonia: number | null;
  weather: Weather | null;
}
export const createBaseEnviromentalData = (): EnviromentalData => ({
  temperature: 14,
  ph: 7,
  ammonia: 0,
  weather: 1,
});
