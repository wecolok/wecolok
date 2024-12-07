<script lang="ts" setup>
import { useTranslate } from "../composables/useTranslate.ts";
import Password from "primevue/password";
import Message from "primevue/message";
import AppButton from "./app-button.vue";

const { translate } = useTranslate();

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
  feedback: {
    type: Boolean,
    default: false,
    required: false,
  },
  placeholder: {
    type: String,
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
    <Password
      :id
      :disabled
      :feedback
      :inputStyle="{ width: '100%' }"
      :mediumLabel="translate('password.medium-label')"
      :placeholder
      :promptLabel="translate('password.prompt-label')"
      :strongLabel="translate('password.strong-label')"
      :value="modelValue"
      :weakLabel="translate('password.weak-label')"
      toggleMask
      @input="onInput"
    />
    <Message v-if="errorMessage" severity="error" size="small" variant="simple">
      {{ errorMessage }}
    </Message>
    <div class="forgot-password">
      <app-button label="Forgot password ?" variant="link" />
    </div>
  </div>
</template>

<style scoped>
.form-field {
  display: flex;
  flex-direction: column;
  gap: 0.275rem;

  .forgot-password {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
