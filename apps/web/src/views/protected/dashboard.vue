<script lang="ts" setup>
import { useAuthStore } from "../../core/stores/auth.store.ts";

const authStore = useAuthStore();
const connectedUser = authStore.connectedUser;
</script>

<template>
  <p>
    Yo tout le monde c'est {{ connectedUser?.firstname }}
    {{ connectedUser?.lastname }}
  </p>
</template>

<style scoped></style>
