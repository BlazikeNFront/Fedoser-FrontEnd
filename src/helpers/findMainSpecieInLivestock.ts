import { SingleLivestockSpecie } from "@/types/Livestock";
export function findMainSpecieInLivestock(
  livestock: SingleLivestockSpecie[]
): SingleLivestockSpecie | null {
  // main specie is specie that has the biggest overall weight in the tank
  return (
    livestock.reduce(
      (currentMainSpecie, currentSpecie) =>
        currentSpecie.weight > currentMainSpecie.weight
          ? currentSpecie
          : currentMainSpecie,
      livestock[0]
    ) || null
  );
}
