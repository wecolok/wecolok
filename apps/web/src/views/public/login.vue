<script lang="ts" setup>
import { useField, useForm } from "vee-validate";
import { useTranslate } from "../../shared/composables/useTranslate.ts";
import AppTextInput from "../../shared/components/app-text-input.vue";
import AppPasswordInput from "../../shared/components/app-password-input.vue";
import AppButton from "../../shared/components/app-button.vue";
import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";
import { useRouter } from "vue-router";
import { useAuthStore } from "../../main.ts";

const { translate } = useTranslate();
const router = useRouter();
const authStore = useAuthStore();

const loginValidationSchema = toTypedSchema(
  z.object({
    email: z
      .string()
      .min(1, { message: translate("login.required") })
      .email({ message: translate("login.invalid-email") }),
    password: z.string().min(1).min(8),
  }),
);

const { handleSubmit, errors } = useForm({
  validationSchema: loginValidationSchema,
});

const { value: email } = useField<string>("email");
const { value: password } = useField<string>("password");

const submitLoginForm = handleSubmit(
  async (values: { email: string; password: string }) => {
    await authStore.login(values.email, values.password);
    await authStore.reloadIdentity();
    void router.push({ path: "/dashboard" });
  },
);
</script>

<template>
  <div class="login-page">
    <form @submit.prevent="submitLoginForm">
      <h1>Welcome back !</h1>
      <app-text-input
        :id="'email'"
        v-model="email"
        :error-message="errors.email"
        :label="translate('login.email-label')"
        :placeholder="translate('login.email-placeholder')"
        size="large"
      />
      <app-password-input
        :id="'password'"
        v-model="password"
        :error-message="errors.password"
        :feedback="false"
        :label="translate('login.password-label')"
        :placeholder="translate('login.password-placeholder')"
        size="large"
      />
      <br />
      <app-button
        :label="translate('login.submit-label')"
        block
        size="large"
        type="submit"
      />
    </form>
  </div>
</template>

<style scoped>
.login-page {
  display: flex;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  padding: 1rem;

  form {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    max-width: 400px;
    width: 100%;
  }
}
</style>
