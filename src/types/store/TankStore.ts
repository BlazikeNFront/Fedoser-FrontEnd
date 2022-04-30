import { Tank } from "@/types/Tank";

export interface TankStore {
  tank: Required<Tank> | null;
}
