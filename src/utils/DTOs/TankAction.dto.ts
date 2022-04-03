import { TankAction } from "@/types/TankAction";

export class TankActionDTO implements TankAction {
  tankId: string;

  constructor(tankId: string) {
    this.tankId = tankId;
  }
}
