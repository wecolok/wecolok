<script lang="ts" setup>
import AppButton from "../../components/app-button.vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../../main.ts";

const authStore = useAuthStore();
const router = useRouter();
const connectedUser = authStore.connectedUser;

const logout = () => {
  authStore.logout();
  void router.push({ path: "/login" });
};
</script>

<template>
  <p>
    Yo tout le monde c'est {{ connectedUser?.firstname }}
    {{ connectedUser?.lastname }}
  </p>
  <app-button label="Logout" @click="logout" />
</template>

<style scoped></style>
