import { computed } from "vue";
import { NavOptions } from "@/types/NavOptions";
import { useRoute, useRouter } from "vue-router";
import { RoutesNames } from "@/constants/routesNames/RoutesNames";
import { useUserStore } from "@/stores/UserStore";
import { Icons } from "@/constants/icons/MdiIcons";
import { NavOption } from "@/types/NavOptions";
export default function useNavConfig() {
  const route = useRoute();
  const router = useRouter();
  const userStore = useUserStore();

  const NAV_OPTIONS: NavOptions = [
    { icon: Icons.HOME, name: RoutesNames.APP_HOME, text: "navBar.home" },
    {
      icon: Icons.FISH,
      name: RoutesNames.USER_TANKS,
      text: "navBar.tanks",
      childrens: [RoutesNames.TANK_DETAILS],
    },
    {
      icon: Icons.POLYGON_PLUS,
      name: RoutesNames.ADD_TANK,
      text: "navBar.addTank",
    },
    {
      icon: Icons.CLIPBOARD,
      name: RoutesNames.FEED_TABLES,
      text: "navBar.feedTables",
      childrens: [RoutesNames.SPECIE_FEED_TABLES],
    },
    {
      icon: Icons.ACCOUNT_SETTINGS,
      name: RoutesNames.USER_SETTINGS,
      text: "navBar.settings",
    },
  ];
  const isRouteActive = computed(() => (option: NavOption) => {
    let routeChildrens = [option.name];
    //create array with main and nested routes
    if (option.childrens) {
      routeChildrens = routeChildrens.concat(option.childrens);
    }
    return routeChildrens.includes(route.name as string);
  });
  function logoutUser() {
    userStore.logoutAction();
    router.push({ name: RoutesNames.HOME });
  }
  return { NAV_OPTIONS, isRouteActive, logoutUser };
}
