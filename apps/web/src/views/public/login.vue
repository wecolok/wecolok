<script lang="ts" setup>
import { useField, useForm } from "vee-validate";
import { useTranslate } from "../../composables/useTranslate.ts";
import AppTextInput from "../../components/app-text-input.vue";
import AppPasswordInput from "../../components/app-password-input.vue";
import AppButton from "../../components/app-button.vue";
import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";
import { Divider } from "primevue";
import { useAuthStore } from "../../core/stores/auth.store.ts";
import { useRouter } from "vue-router";

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
    const success = await authStore.login(values.email, values.password);
    if (success) void router.push({ path: "/dashboard" });
  },
);
</script>

<template>
  <div class="login-page">
    <form @submit.prevent="submitLoginForm">
      <app-text-input
        :id="'email'"
        v-model="email"
        :error-message="errors.email"
        :label="translate('login.email-label')"
        :placeholder="translate('login.email-placeholder')"
      />
      <app-password-input
        :id="'password'"
        v-model="password"
        :error-message="errors.password"
        :forgot-password="true"
        :label="translate('login.password-label')"
        :placeholder="translate('login.password-placeholder')"
      />
      <app-button
        :label="translate('login.submit-label')"
        block
        size="large"
        type="submit"
      />
      <Divider align="center">
        <b>{{ translate("login.divider") }}</b>
      </Divider>
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
