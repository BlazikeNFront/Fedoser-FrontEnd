import colors from "vuetify/lib/util/colors";

export enum TypesOfFeedProgram {
  UNSELECTED,
  FEED_PROGRAM,
}

export enum FeedProgramUpdateFrequency {
  DOSE = 1,
  WEEK = 7,
  CUSTOM = 0,
}

export enum FeedQuality {
  FIRST,
  SECOND,
  THIRD,
  FOURTH,
  FIFTH,
  SIXTH,
  SEVENTH,
}
export const FEED_QUALITY_COLORS = Object.freeze({
  [FeedQuality.FIRST]: colors.green.darken4,
  [FeedQuality.SECOND]: colors.green.darken1,
  [FeedQuality.THIRD]: colors.lime.darken1,
  [FeedQuality.FOURTH]: colors.amber.darken4,
  [FeedQuality.FIFTH]: colors.brown.darken3,
  [FeedQuality.SIXTH]: colors.grey.darken3,
  [FeedQuality.SEVENTH]: colors.grey.darken4,
});
export enum FeedTypes {
  FRY,
  GROWER,
  BROODSTOCK,
  FINISHER,
}
