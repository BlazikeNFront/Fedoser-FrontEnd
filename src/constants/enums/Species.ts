// interface Specie {
//   translation: string;
//   id: number;
// }

// export const species: [Specie, Specie, Specie, Specie, Specie] = [
//   { translation: "species.rainbowTrout", id: 1 },
//   { translation: "species.salmon", id: 2 },
//   { translation: "species.tilapia", id: 3 },
//   { translation: "species.brookTrout", id: 4 },
//   { translation: "species.whitefish", id: 5 },
// ];
export enum Species {
  RAINBOW_TROUT,
  SALMON,
  BROOK_TROUT,
  BROWN_TROUT,
  WHITEFISH,
}
//can be deleted after it would be possible to work with objects on v-selects
export const species = [
  "rainbowTrout",
  "salmon",
  "tilapia",
  "brookTrout",
  "whitefish",
];
