<script lang="ts" setup>
import InputText from "primevue/inputtext";
import Message from "primevue/message";

type Size = "small" | "large";

defineProps({
  modelValue: {
    type: String,
  },
  id: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  disabled: {
    type: Boolean,
    default: false,
    required: false,
  },
  errorMessage: {
    type: String,
    required: false,
  },
  placeholder: {
    type: String,
    required: false,
  },
  size: {
    type: String as () => Size,
    required: false,
  },
});

const emit = defineEmits(["update:modelValue"]);

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit("update:modelValue", target.value);
};
</script>

<template>
  <div class="form-field">
    <label :for="id">{{ label }}</label>
    <InputText
      :id="id"
      :disabled
      :invalid="!!errorMessage"
      :placeholder
      :size
      :value="modelValue"
      @input="onInput"
    />
    <Message v-if="errorMessage" severity="error" size="small" variant="simple">
      {{ errorMessage }}
    </Message>
  </div>
</template>

<style scoped>
.form-field {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 0.275rem;
}
</style>
