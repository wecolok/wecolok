import { defineStore } from "pinia";
import { AuthTokens, CreateUser, User } from "@repo/models/types";
import { AuthService } from "../services/auth.service.ts";
import { setAuthToken } from "../services/config-service.ts";
import {
  decodeJwt,
  fromUnix,
  getExpirationDate,
  isInFuture,
} from "../utils.ts";

interface AuthStoreInterface {
  connectedUser?: User;
  tokens?: AuthTokens;
  loading: boolean;
  error?: string;
}

export const useAuthStore = defineStore("auth", {
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
    async loadCookies() {
      const { accessToken, refreshToken } = getAuthToken();
      if (!(accessToken && refreshToken)) return;
      this.tokens = { accessToken, refreshToken };
      if (shouldReloadToken(accessToken)) {
        await this.refreshAccessToken();
      }
      setAuthToken(this.tokens.accessToken);
      await this.reloadIdentity();
    },
    async reloadIdentity() {
      this.connectedUser = await AuthService.reloadIdentity();
    },
    async login(email: string, password: string): Promise<boolean> {
      this.tokens = await AuthService.login(email, password);
      setAuthToken(this.tokens.accessToken);
      setAuthCookie(this.tokens.accessToken, this.tokens.refreshToken);
      await this.reloadIdentity();
      return Promise.resolve(true);
    },
    async register(createUser: CreateUser) {
      const createdUser = await AuthService.register(createUser);
      await this.userCreated(createdUser, createUser.password);
    },
    async userCreated(createdUser: User, password: string) {
      this.connectedUser = createdUser;
      await this.login(createdUser.email, password);
    },
    async refreshAccessToken() {
      if (!this.tokens) return;
      this.tokens = await AuthService.refreshToken(this.tokens.refreshToken);
    },
  },
});

export function setAuthCookie(accessToken: string, refreshToken: string) {
  const accessTokenExpiration = getExpirationDate(decodeJwt(accessToken).exp);
  const refreshTokenExpiration = getExpirationDate(decodeJwt(refreshToken).exp);

  document.cookie = `accessToken=${accessToken}; expires=${accessTokenExpiration}; path=/`;
  document.cookie = `refreshToken=${refreshToken}; expires=${refreshTokenExpiration}; path=/`;
}

export function getAuthToken() {
  const accessToken = document.cookie
    .split(";")
    .map((cookie) => cookie.trim())
    .find((cookie) => cookie.startsWith("accessToken="))
    ?.split("=")[1];

  const refreshToken = document.cookie
    .split(";")
    .map((cookie) => cookie.trim())
    .find((cookie) => cookie.startsWith("refreshToken="))
    ?.split("=")[1];

  return { accessToken, refreshToken };
}

export function shouldReloadToken(token: string) {
  const decoded = decodeJwt(token);
  return !isInFuture(fromUnix(decoded.exp));
}
