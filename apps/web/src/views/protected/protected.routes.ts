import { RouteRecordRaw } from "vue-router";
import Dashboard from "./dashboard.vue";

export const protectedRoutes: Readonly<RouteRecordRaw[]> = [
  { path: "/dashboard", component: Dashboard, meta: { requiresAuth: true } },
];
