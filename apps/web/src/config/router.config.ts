import { publicRoutes } from "../views/public/public.routes.ts";
import { protectedRoutes } from "../views/protected/protected.routes.ts";
import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "../main.ts";

const routes = [...publicRoutes, ...protectedRoutes];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, _, next) => {
  const store = useAuthStore();

  const authRequired = to.meta.requiresAuth;
  if (authRequired && !store.isAuthenticated) {
    return router.push("/login");
  }
  next();
});
