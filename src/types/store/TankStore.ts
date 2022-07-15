import { TankDto } from "@/types/Tank";

export interface TankStore {
  tank: Required<TankDto> | null;
}
