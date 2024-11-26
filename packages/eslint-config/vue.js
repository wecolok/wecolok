import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import tseslint from "@typescript-eslint/eslint-plugin";
import tseslintParser from "@typescript-eslint/parser";
import pluginVue from "eslint-plugin-vue";
import globals from "globals";
import { config as baseConfig } from "./base.js";

/**
 * A custom ESLint configuration for libraries that use Vue.js.
 *
 * @type {import("eslint").Linter.FlatConfig[]}
 */
export const vueJsConfig = [
  ...baseConfig,
  js.configs.recommended,
  eslintConfigPrettier,
  {
    plugins: {
      vue: pluginVue,
      "@typescript-eslint": tseslint,
    },
    languageOptions: {
      parser: tseslintParser,
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: "module",
        ecmaFeatures: { jsx: true },
        project: "./tsconfig.json",
      },
      globals: {
        ...globals.browser,
      },
    },
    rules: {
      ...pluginVue.configs["recommended"].rules,
      ...tseslint.configs.recommended.rules,
      "vue/script-setup-uses-vars": "error",
    },
  },
];
