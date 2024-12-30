import { beforeEach, describe, expect, it } from "vitest";
import { createPinia, setActivePinia } from "pinia";
import { AuthStore, defineAuthStore } from "./auth.store";
import { InMemoryAuthGateway } from "../../adapters/in-memory/in-memory.auth.gateway";
import { loadingPlugin } from "../plugins/loading.plugin";
import { CreateUser, User } from "@repo/models/types";

describe("Auth Store", () => {
  let store: AuthStore;
  let inMemoryAuthGateway: InMemoryAuthGateway;

  beforeEach(() => {
    const pinia = createPinia();
    pinia.use(loadingPlugin);
    setActivePinia(pinia);

    inMemoryAuthGateway = new InMemoryAuthGateway();
    const useAuthStore = defineAuthStore(inMemoryAuthGateway);
    store = useAuthStore();
  });

  it("should initialize with default values", () => {
    expect(store.connectedUser).toBeUndefined();
    expect(store.tokens).toBeUndefined();
    expect(store.loading).toBe(false);
    expect(store.error).toBeUndefined();
  });

  describe("reloadIdentity", () => {
    it("should load connectedUser", async () => {
      // Given
      const mockedUser: User = {
        id: 1,
        firstname: "John",
        lastname: "Doe",
        email: "john@doe.com",
      };
      inMemoryAuthGateway.withUser(mockedUser);

      // When
      await store.reloadIdentity();

      // Then
      expect(store.connectedUser).toEqual(mockedUser);
    });
  });

  describe("login", () => {
    it.skip("should log in successfully and load the user identity");
  });

  describe("register", () => {
    it("should register a new user and save connectedUser", async () => {
      // Given
      const createUser: CreateUser = {
        firstname: "John",
        lastname: "Doe",
        email: "john@doe.com",
        password: "password123",
      };
      const mockedCreatedUser: User = {
        id: 1,
        firstname: "John",
        lastname: "Doe",
        email: "john@doe.com",
      };
      // When
      await store.register(createUser);

      // Then
      expect(store.connectedUser).toEqual(mockedCreatedUser);
    });
  });
});
