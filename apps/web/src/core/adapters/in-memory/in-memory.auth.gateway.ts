import { AuthGateway } from "../../port/auth.gateway.ts";
import { AuthTokens, CreateUser, User } from "@repo/models/types";
import { apiClient } from "../../services/config-service.ts";

export class InMemoryAuthGateway implements AuthGateway {
  users: User[] = [];

  async login(email: string, password: string): Promise<AuthTokens> {
    throw new Error("Method not implemented.");
  }

  async refreshToken(refreshToken: string): Promise<AuthTokens> {
    return apiClient
      .post("/auth/refresh", { refreshToken })
      .then((res) => res.data);
  }

  async register(createUser: CreateUser): Promise<User> {
    const newUser: User = {
      id: this.users.length + 1, // Simple génération d'ID incrémental
      firstname: createUser.firstname,
      lastname: createUser.lastname,
      email: createUser.email,
    };

    this.users.push(newUser);

    return Promise.resolve(newUser);
  }

  async reloadIdentity(): Promise<User> {
    return this.users[0];
  }

  withUser(user: User) {
    this.users[0] = user;
  }
}
