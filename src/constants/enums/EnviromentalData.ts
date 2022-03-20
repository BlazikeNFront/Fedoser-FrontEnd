import { Weather } from "./Weather";

export interface EnviromentalDataKeys {
  temperature: number | null;
  ph: number | null;
  ammonia: number | null;
  weather: Weather | null;
}
