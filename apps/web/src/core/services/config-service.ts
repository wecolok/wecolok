import axios from "axios";
import { Nullable } from "@repo/models/types";

export const apiClient = axios.create({
  //todo: move baseUrl to .env
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

export function setRequestAuthToken(token: Nullable<string>) {
  apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}
