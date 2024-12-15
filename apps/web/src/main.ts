import { createApp } from "vue";
import "./style.css";
import "normalize.css";
import "primeicons/primeicons.css";
import App from "./App.vue";
import { createPinia } from "pinia";
import { createRouter, createWebHistory } from "vue-router";
import { publicRoutes } from "./public.routes.ts";
import PrimeVue from "primevue/config";
import { WeColokPreset } from "../primevue.config.ts";
import { createI18n } from "vue-i18n";
import * as i18nEn from "./assets/i18n/en.json";
import * as i18nFr from "./assets/i18n/fr.json";
import * as i18nJp from "./assets/i18n/jp.json";
import { protectedRoutes } from "./protected.routes.ts";
import { AuthGateway } from "./core/port/auth.gateway.ts";

import { defineAuthStore } from "./core/stores/auth.store.ts";
import { HttpAuthGateway } from "./core/adapters/http/http-auth.gateway.ts";
import { InMemoryAuthGateway } from "./core/adapters/in-memory/in-memory.auth.gateway.ts";
import { loadingPlugin } from "./core/stores/plugins/loading.plugin.ts";

const app = createApp(App);
const pinia = createPinia();

const i18n = createI18n({
  locale: "en",
  fallbackLocale: "en",
  messages: {
    en: i18nEn,
    fr: i18nFr,
    jp: i18nJp,
  },
});

const routes = [...publicRoutes, ...protectedRoutes];

const primeVueOptions = {
  theme: {
    preset: WeColokPreset,
    options: {
      darkModeSelector: ".app-dark",
    },
  },
};

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, _, next) => {
  const authRequired = to.meta.requiresAuth;
  if (authRequired && !store.isAuthenticated) {
    return router.push("/login");
  }
  next();
});

pinia.use(loadingPlugin);

app.use(pinia).use(PrimeVue, primeVueOptions).use(i18n);

export const authGateway: AuthGateway =
  process.env.NODE_ENV === "test"
    ? new InMemoryAuthGateway()
    : new HttpAuthGateway();

export const useAuthStore = defineAuthStore(authGateway);

const store = useAuthStore();

await store.loadCookies();

// initialize router after auth store is initialized
app.use(router);

app.config.errorHandler = (err, instance, info) => {
  console.error(err);
  console.log(instance, info);
};

app.provide("authGateway", authGateway);

app.mount("#app");
