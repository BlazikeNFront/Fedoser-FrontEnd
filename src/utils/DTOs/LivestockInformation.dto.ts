import { SingleLivestockSpecie } from "@/types/Livestock";
import { LivestockInformation } from "@/types/Tank";
import { ChangeSpecieWeightPayload } from "./ChangeSpecieWeight.dto";
export class LivestockInformationDTO implements LivestockInformation {
  initial: SingleLivestockSpecie[];
  current: SingleLivestockSpecie[];
  changes: ChangeSpecieWeightPayload[];

  constructor({ initial, current, changes }: Partial<LivestockInformation>) {
    this.initial = initial || [];
    this.current = current || [];
    this.changes = changes || [];
  }
}
