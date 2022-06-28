import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { PortalRoles } from "@/constants/enums/PortalRoles";
import routes from "./paths/index";
import { RouteLocationNormalized } from "vue-router";
import { useUserStore } from "@/stores/UserStore";
import { RoutesNames } from "@/constants/routesNames/RoutesNames";
import pinia from "@/stores/store";

const router = createRouter({
  history: createWebHistory(),
  routes: routes as Array<RouteRecordRaw>,
});
interface RouteMetaProperty {
  roles?: PortalRoles[];
}
interface SingleRoute extends Omit<RouteLocationNormalized, "meta"> {
  meta: RouteMetaProperty;
}
router.beforeEach((to: SingleRoute, _: SingleRoute, next) => {
  const userStore = useUserStore(pinia);
  if (!userStore.isTokenProvided && to.meta.roles?.includes(PortalRoles.USER)) {
    return next({ name: RoutesNames.HOME });
  }
  next();
});
export default router;
