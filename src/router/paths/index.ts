import Home from "@/views/Home.vue";
import AppHome from "@/views/AppHome.vue";
import AddTank from "@/views/Addtank/addTank.vue";
import UserTanks from "@/views/UserTanks/userTanks.vue";
import SingleTank from "@/views/UserTanks/singleTank.vue";
import FeedTables from "@/views/FeedTables/FeedTables.vue";
import UserSettings from "@/views/UserSettings/UserSettings.vue";
import SignIn from "@/views/Home/SignIn.vue";
import SignUp from "@/views/Home/SignUp.vue";
import Index from "@/views/Home/index.vue";
import SpecieFeedTables from "@/views/FeedTables/SpecieFeedTables.vue";
import { RoutesNames } from "@/constants/routesNames/RoutesNames";
import { RouteRecordRaw } from "vue-router";
import { PortalRoles } from "@/constants/enums/PortalRoles";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: Home,
    children: [
      { name: RoutesNames.HOME, path: "/", component: Index },
      { name: RoutesNames.SIGN_IN, path: "/signIn", component: SignIn },
      { name: RoutesNames.SIGN_UP, path: "/signUp", component: SignUp },
    ],
  },
  {
    name: RoutesNames.APP_HOME,
    path: "/app",
    component: AppHome,
    meta: { roles: [PortalRoles.USER] },
  },
  {
    name: RoutesNames.ADD_TANK,
    path: "/addTank",
    component: AddTank,
    meta: { roles: [PortalRoles.USER] },
  },
  {
    name: RoutesNames.USER_TANKS,
    path: "/userTanks",
    component: UserTanks,
    meta: { roles: [PortalRoles.USER] },
  },
  {
    name: RoutesNames.TANK_DETAILS,
    path: "/userTanks/:id",
    component: SingleTank,
    meta: { roles: [PortalRoles.USER] },
  },
  {
    name: RoutesNames.FEED_TABLES,
    path: "/feedTables",
    component: FeedTables,
    meta: { roles: [PortalRoles.USER] },
  },
  {
    name: RoutesNames.SPECIE_FEED_TABLES,
    path: "/feedTables/:specie",
    component: SpecieFeedTables,
    meta: { roles: [PortalRoles.USER] },
  },
  {
    name: RoutesNames.USER_SETTINGS,
    path: "/userSettings",
    component: UserSettings,
    meta: { roles: [PortalRoles.USER] },
  },
  {
    name: RoutesNames.FALLBACK,
    path: "/:catchAll(.*)",
    component: AppHome,
    meta: { roles: [PortalRoles.USER] },
  },
];
export default routes;
