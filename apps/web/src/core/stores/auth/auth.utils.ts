import {
  decodeJwt,
  fromUnix,
  getExpirationDate,
  isInFuture,
} from "../../utils.ts";
import { useAuthStore } from "../../../main.ts";
import { setRequestAuthToken } from "../../services/config-service.ts";

export function saveAuthTokensInCookies(
  accessToken: string,
  refreshToken: string,
) {
  const accessTokenExpiration = getExpirationDate(decodeJwt(accessToken).exp);
  const refreshTokenExpiration = getExpirationDate(decodeJwt(refreshToken).exp);

  document.cookie = `accessToken=${accessToken}; expires=${accessTokenExpiration}; path=/`;
  document.cookie = `refreshToken=${refreshToken}; expires=${refreshTokenExpiration}; path=/`;
}

export function getAuthTokenFromCookies() {
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

export function removeAuthTokensFromCookies() {
  document.cookie =
    "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  document.cookie =
    "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

export function shouldReloadToken(token: string) {
  const decoded = decodeJwt(token);
  return !isInFuture(fromUnix(decoded.exp));
}

export async function loadIdentity(accessToken: string, refreshToken: string) {
  const store = useAuthStore();
  await store.setTokens(accessToken, refreshToken);

  if (shouldReloadToken(accessToken)) {
    await store.refreshAccessToken();
  }

  if (!store.tokens?.accessToken) return;

  setRequestAuthToken(store.tokens.accessToken);
  await store.reloadIdentity();
}
