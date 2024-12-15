import { ref, toRef } from "vue";
import { PiniaPluginContext } from "pinia";

export const loadingPlugin = ({ store }: PiniaPluginContext) => {
  if (!store.$state.hasOwnProperty("loading")) {
    console.log("coucou");
    store.$state.loading = ref(false);
  }

  store.loading = toRef(store.$state, "loading");

  store.$onAction(({ after, onError }) => {
    store.loading = true;

    after(() => {
      store.loading = false;
    });

    onError(() => {
      store.loading = false;
    });
  });
};
