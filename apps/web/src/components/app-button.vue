<script lang="ts" setup>
import Button from "primevue/button";

type Variant = "primary" | "danger" | "success" | "info";
type Type = "button" | "submit";

defineProps({
  label: {
    type: String,
    required: true,
  },
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
  <Button
    v-if="variant === 'primary'"
    :disabled="disabled"
    :label="label"
    :type="type"
  />
</template>

<style scoped></style>
