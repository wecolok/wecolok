import {
  NavigationGuardNext,
  RouteLocationNormalized,
  RouteRecordRaw,
} from "vue-router";
import Landing from "./views/public/landing.vue";
import { useAuthStore } from "./main.ts";

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
    component: () => import("./views/public/login.vue"),
    beforeEnter: canAccess,
  },
  {
    path: "/register",
    component: () => import("./views/public/register.vue"),
    beforeEnter: canAccess,
  },
];
