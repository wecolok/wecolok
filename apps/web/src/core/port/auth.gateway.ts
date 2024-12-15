import { AuthTokens, User } from "@repo/models/types";

export interface AuthGateway {
  login(email: string, password: string): Promise<AuthTokens>;

  refreshToken(refreshToken: string): Promise<AuthTokens>;

  register(request: any): Promise<User>;

  reloadIdentity(): Promise<User>;
}
