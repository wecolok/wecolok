import { RouteRecordRaw } from "vue-router";
import Landing from "./views/public/landing.vue";

export const publicRoutes: Readonly<RouteRecordRaw[]> = [
  { path: "/", component: Landing },
];
