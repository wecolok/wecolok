import { RouteRecordRaw } from "vue-router";
import Landing from "./views/public/landing.vue";

export const publicRoutes: Readonly<RouteRecordRaw[]> = [
  { path: "/", component: Landing },
  { path: "/login", component: () => import("./views/public/login.vue") },
  { path: "/register", component: () => import("./views/public/register.vue") },
];
