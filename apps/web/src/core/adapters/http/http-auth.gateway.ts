import { AuthTokens, CreateUser, User } from "@repo/models/types";
import { apiClient } from "../../services/config-service.ts";
import { AuthGateway } from "../../port/auth.gateway.ts";

export class HttpAuthGateway implements AuthGateway {
  async login(email: string, password: string): Promise<AuthTokens> {
    return apiClient
      .post("/auth/login", { email, password })
      .then((res) => res.data);
  }

  async refreshToken(refreshToken: string): Promise<AuthTokens> {
    return apiClient
      .post("/auth/refresh", { refreshToken })
      .then((res) => res.data);
  }

  async register(createUser: CreateUser): Promise<User> {
    return apiClient.post("/auth/register", createUser).then((res) => res.data);
  }

  async reloadIdentity() {
    return apiClient
      .get("/users/me")
      .then((res) => res.data)
      .catch((err) => {
        throw err.response.data;
      });
  }
}
