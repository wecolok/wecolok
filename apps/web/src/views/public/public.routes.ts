import {
  NavigationGuardNext,
  RouteLocationNormalized,
  RouteRecordRaw,
} from "vue-router";
import Landing from "./landing.vue";
import { useAuthStore } from "../../main.ts";

function canAccess(
  _: RouteLocationNormalized,
  __: RouteLocationNormalized,
  next: NavigationGuardNext,
) {
  const store = useAuthStore();
  if (store.isAuthenticated) {
    return next("/dashboard");
  }
  next();
}

export const publicRoutes: Readonly<RouteRecordRaw[]> = [
  { path: "", component: Landing },
  {
    path: "/login",
    component: () => import("./login.vue"),
    beforeEnter: canAccess,
  },
  {
    path: "/register",
    component: () => import("./register.vue"),
    beforeEnter: canAccess,
  },
];
