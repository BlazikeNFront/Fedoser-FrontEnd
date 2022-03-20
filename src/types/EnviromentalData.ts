import { Weather } from "@/constants/enums/Weather";

export interface EnviromentalData {
  temperature: number | null;
  ph: number | null;
  ammonia: number | null;
  weather: Weather | null;
}
