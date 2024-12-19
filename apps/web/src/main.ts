import { createApp } from "vue";
import "./style.css";
import "normalize.css";
import "primeicons/primeicons.css";
import App from "./App.vue";
import PrimeVue from "primevue/config";
import { AuthGateway } from "./core/port/auth.gateway.ts";

import { defineAuthStore } from "./core/stores/auth-store/auth.store.ts";
import { HttpAuthGateway } from "./core/adapters/http/http-auth.gateway.ts";
import {
  getAuthTokenFromCookies,
  loadIdentity,
} from "./core/stores/auth-store/auth.utils.ts";
import { pinia } from "./config/pinia.config.ts";
import { i18n } from "./config/i18n.config.ts";
import { primeVueOptions } from "./config/primevue.config.ts";
import { router } from "./config/router.config.ts";

export const authGateway: AuthGateway = new HttpAuthGateway();
export const useAuthStore = defineAuthStore(authGateway);

const app = createApp(App);

// initialize app
app.use(pinia).use(PrimeVue, primeVueOptions).use(i18n);

// load identity from cookies if they exist
const { accessToken, refreshToken } = getAuthTokenFromCookies();
if (accessToken && refreshToken) {
  await loadIdentity(accessToken, refreshToken);
}

// initialize router after auth store is initialized
app.use(router);

app.mount("#app");
