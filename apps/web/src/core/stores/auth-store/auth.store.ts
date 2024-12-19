import { defineStore } from "pinia";
import { AuthTokens, CreateUser, User } from "@repo/models/types";
import { setRequestAuthToken } from "../../services/config-service.ts";
import { AuthGateway } from "../../port/auth.gateway.ts";
import {
  removeAuthTokensFromCookies,
  saveAuthTokensInCookies,
} from "./auth.utils.ts";

interface AuthStoreInterface {
  connectedUser?: User;
  tokens?: AuthTokens;
  loading: boolean;
  error?: string;
}

export const defineAuthStore = (authGateway: AuthGateway) =>
  defineStore("auth", {
    state: (): AuthStoreInterface => ({
      connectedUser: undefined,
      tokens: undefined,
      loading: false,
      error: undefined,
    }),
    getters: {
      isAuthenticated(): boolean {
        return !!this.connectedUser;
      },
    },
    actions: {
      async reloadIdentity() {
        this.connectedUser = await authGateway.reloadIdentity();
      },
      async login(email: string, password: string) {
        this.tokens = await authGateway.login(email, password);
        setRequestAuthToken(this.tokens.accessToken);
        saveAuthTokensInCookies(
          this.tokens.accessToken,
          this.tokens.refreshToken,
        );
      },
      async register(createUser: CreateUser) {
        this.connectedUser = await authGateway.register(createUser);
      },
      async refreshAccessToken() {
        if (!this.tokens) return;
        this.tokens = await authGateway.refreshToken(this.tokens.refreshToken);
      },
      logout() {
        this.connectedUser = undefined;
        this.tokens = undefined;
        removeAuthTokensFromCookies();
        setRequestAuthToken(null);
      },
      async setTokens(accessToken: string, refreshToken: string) {
        this.tokens = { accessToken, refreshToken };
      },
    },
  });

export type AuthStore = ReturnType<ReturnType<typeof defineAuthStore>>;
