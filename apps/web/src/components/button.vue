<script lang="ts" setup>
type Variant = "primary" | "danger" | "success" | "info";
type Type = "button" | "submit";

defineProps({
  type: {
    type: String as () => Type,
    default: "button",
  },
  variant: {
    type: String as () => Variant,
    default: "primary",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <button v-if="variant === 'primary'" :disabled="disabled" :type="type">
    <slot />
  </button>
</template>

<style scoped></style>
