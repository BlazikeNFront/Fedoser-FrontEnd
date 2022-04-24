import { SingleLivestockSpecie } from "@/types/Livestock";

export const calcLivestockWeight = (livestock: SingleLivestockSpecie[]) =>
  livestock.reduce((sum, element) => element.weight + sum, 0);
