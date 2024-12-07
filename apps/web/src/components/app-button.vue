<script lang="ts" setup>
import Button from "primevue/button";

type Color = "primary" | "danger" | "success" | "info";
type Variant = "text" | "outlined" | "link";
type Type = "button" | "submit";
type IconPosition = "left" | "right";
type Size = "small" | "large";

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
    default: undefined,
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
  block: {
    type: Boolean,
    default: false,
    required: false,
  },
});
</script>

<template>
  <Button
    :class="{ block: block, 'big-button': size === 'large' }"
    :disabled
    :icon
    :icon-pos="iconPosition"
    :label
    :severity="color"
    :size
    :type
    :variant
  />
</template>

<style scoped>
.block {
  width: 100%;
}
</style>
