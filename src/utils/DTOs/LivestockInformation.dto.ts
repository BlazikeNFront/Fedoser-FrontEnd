import { LivestockInformation, SingleLivestockSpecie } from "@/types/Livestock";

export class LivestockInformationDTO implements LivestockInformation {
  livestock: SingleLivestockSpecie[];
  initialLivestockWeight: number;
  constructor(livestockInformation: Partial<LivestockInformation>) {
    const { livestock, initialLivestockWeight } = livestockInformation;
    this.livestock = livestock || [];
    this.initialLivestockWeight = initialLivestockWeight || 0;
  }
}
