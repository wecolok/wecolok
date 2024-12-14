import { apiClient } from "./config-service.ts";
import { AuthTokens, CreateUser, User } from "@repo/models/types";

export namespace AuthService {
  export const login = async (
    email: string,
    password: string,
  ): Promise<AuthTokens> => {
    return apiClient
      .post("/auth/login", { email, password })
      .then((res) => res.data);
  };

  export const logout = () => {};

  export const refreshToken = async (refreshToken: string) => {
    return apiClient
      .post("/auth/refresh", { refreshToken })
      .then((res) => res.data);
  };

  export const register = async (createUser: CreateUser): Promise<User> => {
    return apiClient.post("/auth/register", createUser).then((res) => res.data);
  };

  export const reloadIdentity = async () => {
    return apiClient
      .get("/users/me")
      .then((res) => res.data)
      .catch((err) => {
        throw err.response.data;
      });
  };

  export const resetPassword = () => {};
}
