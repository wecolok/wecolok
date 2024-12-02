import { createApp } from "vue";
import "./style.css";
import "normalize.css";
import "primeicons/primeicons.css";
import App from "./App.vue";
import { createPinia } from "pinia";
import { createRouter, createWebHistory } from "vue-router";
import { publicRoutes } from "./public.routes.ts";
import PrimeVue from "primevue/config";
import { ColokPreset } from "../primevue.config.ts";

const app = createApp(App);

const routes = [...publicRoutes];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const pinia = createPinia();

app
  .use(pinia)
  .use(PrimeVue, {
    theme: {
      preset: ColokPreset,
      options: {
        darkModeSelector: "system",
      },
    },
  })
  .use(router);

app.config.errorHandler = (err, instance, info) => {
  console.error(err);
  console.log(instance, info);
};

app.mount("#app");
