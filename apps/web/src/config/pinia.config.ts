import { createPinia } from "pinia";
import { loadingPlugin } from "../core/stores/plugins/loading.plugin.ts";

export const pinia = createPinia();

pinia.use(loadingPlugin);
