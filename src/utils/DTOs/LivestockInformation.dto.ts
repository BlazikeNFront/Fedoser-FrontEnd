import { SingleLivestockSpecie } from "@/types/Livestock";
import { LivestockInformation } from "@/types/Tank";

export class LivestockInformationDTO implements LivestockInformation {
  initial: SingleLivestockSpecie[];
  current: SingleLivestockSpecie[];
  constructor({ initial, current }: Partial<LivestockInformation>) {
    this.initial = initial || [];
    this.current = current || [];
  }
}
