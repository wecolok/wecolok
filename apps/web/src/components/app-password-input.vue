<script lang="ts" setup>
import { useTranslate } from "../composables/useTranslate.ts";
import Password from "primevue/password";
import Message from "primevue/message";
import AppButton from "./app-button.vue";

const { translate } = useTranslate();

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
  feedback: {
    type: Boolean,
    default: false,
    required: false,
  },
  placeholder: {
    type: String,
    required: false,
  },
  forgotPassword: {
    type: Boolean,
    default: false,
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
    <Password
      :id
      :disabled
      :feedback
      :inputStyle="{ width: '100%' }"
      :invalid="!!errorMessage"
      :mediumLabel="translate('password.medium-label')"
      :placeholder
      :promptLabel="translate('password.prompt-label')"
      :size
      :strongLabel="translate('password.strong-label')"
      :value="modelValue"
      :weakLabel="translate('password.weak-label')"
      toggleMask
      @input="onInput"
    />
    <Message v-if="errorMessage" severity="error" size="small" variant="simple">
      {{ errorMessage }}
    </Message>
    <div v-if="forgotPassword" class="forgot-password">
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
