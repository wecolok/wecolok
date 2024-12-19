<script lang="ts" setup></script>

<template>
  <div class="app-container">
    <router-view />
  </div>
</template>

<style scoped>
.app-container {
  @media (max-width: 768px) {
    padding: 1rem;
  }
}
</style>
