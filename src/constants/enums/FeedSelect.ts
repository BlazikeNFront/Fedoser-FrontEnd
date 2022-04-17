import { Feed } from "@/types/Feed";

export enum TypesOfFeedProgram {
  UNSELECTED,
  FEED_PROGRAM,
}

export enum FeedProgramUpdateFrequency {
  DOSE = 1,
  WEEK = 7,
  CUSTOM = 0,
}

export const FEEDS: Feed[] = [
  {
    name: "Aller Aqua Futura",
    size: "0.1-0.5",
    fcr: 0.7,
  },
  {
    name: "Aller Aqua Brone",
    size: "0.5-1",
    fcr: 0.8,
  },
  {
    name: "Aller Aqua Silver",
    size: "1-2",
    fcr: 0.9,
  },
  {
    name: "Aller Aqua Gold",
    size: "2-5",
    fcr: 1,
  },
];
