import { defineStore } from "pinia";
import { AuthTokens, CreateUser, User } from "@repo/models/types";
import { setAuthToken } from "../services/config-service.ts";
import {
  decodeJwt,
  fromUnix,
  getExpirationDate,
  isInFuture,
} from "../utils.ts";
import { AuthGateway } from "../port/auth.gateway.ts";

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
        this.connectedUser = await authGateway.reloadIdentity();
      },
      async login(email: string, password: string): Promise<boolean> {
        //todo: refactor for better testability
        this.tokens = await authGateway.login(email, password);
        setAuthToken(this.tokens.accessToken);
        setAuthCookie(this.tokens.accessToken, this.tokens.refreshToken);
        await this.reloadIdentity();
        return Promise.resolve(true);
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

        document.cookie =
          "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie =
          "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

        setAuthToken(null);
      },
    },
  });

export function setAuthCookie(accessToken: string, refreshToken: string) {
  const accessTokenExpiration = getExpirationDate(decodeJwt(accessToken).exp);
  const refreshTokenExpiration = getExpirationDate(decodeJwt(refreshToken).exp);

  document.cookie = `accessToken=${accessToken}; expires=${accessTokenExpiration}; path=/`;
  document.cookie = `refreshToken=${refreshToken}; expires=${refreshTokenExpiration}; path=/`;
}

export type AuthStore = ReturnType<ReturnType<typeof defineAuthStore>>;

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
