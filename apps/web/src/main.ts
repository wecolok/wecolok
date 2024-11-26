import { createApp } from "vue";
import "./assets/index.css";
import App from "./App.vue";
import { createPinia } from "pinia";
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { publicRoutes } from "./public.routes.ts";

const routes: Readonly<RouteRecordRaw[]> = {
  ...publicRoutes,
  ...publicRoutes,
};

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const pinia = createPinia();

createApp(App).use(router).use(pinia).mount("#app");
