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

    quality: 1,
    fileName: "string",
  },
  {
    name: "Aller Aqua Futura 2",
    size: "0.1-0.5",

    quality: 1,
    fileName: "string",
  },
  {
    name: "Aller Aqua Futura 3",
    size: "0.1-0.5",

    quality: 1,
    fileName: "string",
  },
  {
    name: "Aller Aqua Futura 4",
    size: "0.1-0.5",

    quality: 1,
    fileName: "string",
  },
];
