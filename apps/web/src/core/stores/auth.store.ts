import { defineStore } from "pinia";
import { AuthTokens, User } from "@repo/models/types";

interface AuthStoreInterface {
  connectedUser?: User;
  tokens?: AuthTokens;
  loading: boolean;
  error?: string;
}

export const authStore = defineStore("auth", {
  state: (): AuthStoreInterface => ({
    connectedUser: undefined,
    tokens: undefined,
    loading: false,
    error: undefined,
  }),
  getters: {},
  actions: {},
});
