import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { createPinia } from "pinia";
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { publicRoutes } from "./public.routes.ts";

const app = createApp(App);

const routes: Readonly<RouteRecordRaw[]> = {
  ...publicRoutes,
  ...publicRoutes,
};

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const pinia = createPinia();

app.use(router).use(pinia);

app.config.errorHandler = (err, instance, info) => {
  console.error(err);
  console.log(instance, info);
};

app.mount("#app");
