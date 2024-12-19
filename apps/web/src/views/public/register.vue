<script lang="ts" setup>
import { useField, useForm } from "vee-validate";
import { useTranslate } from "../../shared/composables/useTranslate.ts";
import AppTextInput from "../../shared/components/app-text-input.vue";
import AppPasswordInput from "../../shared/components/app-password-input.vue";
import AppButton from "../../shared/components/app-button.vue";
import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";
import { useAuthStore } from "../../main.ts";
import { useRouter } from "vue-router";
import { ref } from "vue";
import SelectButton from "primevue/selectbutton";

const { translate } = useTranslate();
const authStore = useAuthStore();
const router = useRouter();

const registerValidationSchema = toTypedSchema(
  z.object({
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
  }),
);

const { handleSubmit, errors } = useForm({
  validationSchema: registerValidationSchema,
});

const { value: firstname } = useField<string>("firstname");
const { value: lastname } = useField<string>("lastname");
const { value: email } = useField<string>("email");
const { value: password } = useField<string>("password");

const { value: status } = useField<string>("status", undefined, {
  initialValue: "create",
});

const statusOptions = ref([
  { name: "Je créé ma colocation", value: "create" },
  { name: "Je rejoins une colocation", value: "join" },
]);

const submitRegisterForm = handleSubmit(async (values) => {
  await authStore.register(values);
  await authStore.login(values.email, values.password);
  void router.push({ path: "/dashboard" });
});
</script>

<template>
  <div class="register-page">
    <form @submit.prevent="submitRegisterForm">
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
      <SelectButton
        v-model="status"
        :options="statusOptions"
        option-label="name"
      />
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
      <br />
      <app-button
        :disabled="authStore.loading"
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
    max-width: 400px;
    width: 100%;
  }
}
</style>
