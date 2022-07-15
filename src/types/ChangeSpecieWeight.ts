import { SingleLivestockSpecie } from "@/types/Livestock";
export class ChangeSpecieWeightDto {
  constructor(
    readonly before: SingleLivestockSpecie,
    readonly after: SingleLivestockSpecie,
    readonly reason: string,
    readonly date: string
  ) {}
}
