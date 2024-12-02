<script lang="ts" setup>
import Button from "primevue/button";

type Color = "primary" | "danger" | "success" | "info";
type Variant = "text" | "outlined";
type Type = "button" | "submit";
type IconPosition = "left" | "right";
type Size = "small" | "medium" | "large";

defineProps({
  label: {
    type: String,
    required: true,
  },
  color: {
    type: String as () => Color,
    default: "primary",
    required: false,
  },
  variant: {
    type: String as () => Variant,
    required: false,
  },
  type: {
    type: String as () => Type,
    default: "button",
    required: false,
  },
  size: {
    type: String as () => Size,
    default: "medium",
    required: false,
  },
  disabled: {
    type: Boolean,
    default: false,
    required: false,
  },
  icon: {
    type: String,
    required: false,
  },
  iconPosition: {
    type: String as () => IconPosition,
    default: "left",
    required: false,
  },
});
</script>

<template>
  <Button
    :disabled="disabled"
    :icon="icon"
    :icon-pos="iconPosition"
    :label="label"
    :severity="color"
    :type="type"
    :variant="variant"
  />
</template>

<style scoped></style>
