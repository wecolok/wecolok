<script lang="ts" setup>
import { useField, useForm } from "vee-validate";
import { useTranslate } from "../../composables/useTranslate.ts";
import AppTextInput from "../../components/app-text-input.vue";
import AppPasswordInput from "../../components/app-password-input.vue";
import AppButton from "../../components/app-button.vue";
import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";
import { useAuthStore } from "../../core/stores/auth.store.ts";

const { translate } = useTranslate();
const authStore = useAuthStore();

const registerValidationSchema = toTypedSchema(
  z
    .object({
      firstname: z
        .string()
        .min(1, { message: translate("register.errors.required") }),
      lastname: z
        .string()
        .min(1, { message: translate("register.errors.required") }),
      email: z
        .string()
        .min(1, { message: translate("register.errors.required") })
        .email({ message: translate("register.errors.invalid-email") }),
      password: z
        .string()
        .min(8, { message: translate("register.errors.required") })
        .regex(/[A-Z]/, {
          message: translate("register.errors.uppercase-required"),
        })
        .regex(/[a-z]/, {
          message: translate("register.errors.lowercase-required"),
        })
        .regex(/\d/, { message: translate("register.errors.number-required") })
        .regex(/[@$!%*?&#]/, {
          message: translate("register.errors.special-character-required"),
        })
        .refine((value) => !/\s/.test(value), {
          message: translate("register.errors.no-space"),
        }),
      passwordConfirmation: z
        .string()
        .min(1, { message: translate("register.errors.required") }),
    })
    .refine((data) => data.password === data.passwordConfirmation, {
      path: ["passwordConfirmation"],
      message: translate("register.errors.passwords-do-not-match"),
    }),
);

const { handleSubmit, errors } = useForm({
  validationSchema: registerValidationSchema,
});

const { value: firstname } = useField<string>("firstname");
const { value: lastname } = useField<string>("lastname");
const { value: email } = useField<string>("email");
const { value: password } = useField<string>("password");
const { value: passwordConfirmation } = useField<string>(
  "passwordConfirmation",
);

const submitRegisterForm = handleSubmit((values) => {
  authStore.register(values);
});
</script>

<template>
  <div class="register-page">
    <form @submit.prevent="submitRegisterForm">
      <div class="name-fields">
        <app-text-input
          :id="'firstname'"
          v-model="firstname"
          :error-message="errors.firstname"
          :label="translate('register.firstname.label')"
          :placeholder="translate('register.firstname.placeholder')"
          size="large"
        />
        <app-text-input
          :id="'lastname'"
          v-model="lastname"
          :error-message="errors.lastname"
          :label="translate('register.lastname.label')"
          :placeholder="translate('register.lastname.placeholder')"
          size="large"
        />
      </div>
      <app-text-input
        :id="'email'"
        v-model="email"
        :error-message="errors.email"
        :label="translate('register.email.label')"
        :placeholder="translate('register.email.placeholder')"
        size="large"
      />
      <app-password-input
        :id="'password'"
        v-model="password"
        :error-message="errors.password"
        :label="translate('register.password.label')"
        :placeholder="translate('register.password.placeholder')"
        size="large"
      />
      <app-password-input
        :id="'password'"
        v-model="passwordConfirmation"
        :error-message="errors.passwordConfirmation"
        :label="translate('register.password.confirmation.label')"
        :placeholder="translate('register.password.confirmation.placeholder')"
        size="large"
      />
      <br />
      <app-button
        :label="translate('register.submit-label')"
        block
        size="large"
        type="submit"
      />
    </form>
  </div>
</template>

<style scoped>
.register-page {
  display: flex;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  padding: 1rem;

  form {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    .name-fields {
      display: flex;
      gap: 0.5rem;
    }
  }
}
</style>
