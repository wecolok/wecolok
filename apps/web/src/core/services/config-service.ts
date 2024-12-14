import axios from "axios";

export const apiClient = axios.create({
  //todo: move baseUrl to .env
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

export function setAuthToken(token: string) {
  apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}
