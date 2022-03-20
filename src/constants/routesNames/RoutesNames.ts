import { RouteRecordName } from "vue-router";

export enum RoutesNames {
  HOME = "home",
  SIGN_IN = "signIn",
  SIGN_UP = "signUp",
  APP_HOME = "appHome",
  ADD_TANK = "addTank",
  USER_TANKS = "userTanks",
  TANK_DETAILS = "tankDetails",
  LIVESTOCK_MOVE = "livestockMove",
  USER_SETTINGS = "userSettings",
}

export const HomeLayoutPages: RouteRecordName[] = [
  RoutesNames.HOME,
  RoutesNames.SIGN_IN,
  RoutesNames.SIGN_UP,
];
