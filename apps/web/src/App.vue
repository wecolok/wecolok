<script lang="ts" setup>
import { useAuthStore } from "./main.ts";

const store = useAuthStore();
</script>

<template>
  <div class="app-container">
    {{ store.loading }}
    <router-view />
  </div>
</template>

<style scoped></style>
