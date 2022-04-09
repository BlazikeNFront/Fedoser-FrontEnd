import { SingleLivestockSpecie } from "@/types/Livestock";
export function findMainSpecieInLivestock(
  //array must contain at least one element(tbh i dont know if this is a good approach...)
  livestock: SingleLivestockSpecie[]
): SingleLivestockSpecie {
  // main specie is specie that has the biggest overall weight in the tank
  return livestock.reduce(
    (currentMainSpecie, currentSpecie) =>
      currentSpecie.weight > currentMainSpecie.weight
        ? currentSpecie
        : currentMainSpecie,
    livestock[0]
  );
}
