import { EnviromentalData } from "@/types/EnviromentalData";

export function enviromentalDataFactory(): EnviromentalData {
  return {
    temperature: null,
    ph: null,
    ammonia: null,
    weather: null,
  };
}
