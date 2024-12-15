import { describe, expect, it } from "vitest";
import { decodeJwt, fromUnix, getExpirationDate, isInFuture } from "./utils.ts";

describe("utils functions", () => {
  describe("decodeJwt", () => {
    it("should correctly decode a JWT token payload", () => {
      const token =
        "header." +
        btoa(JSON.stringify({ name: "John Doe", exp: 1234567890 })) +
        ".signature";

      const result = decodeJwt(token);

      expect(result).toEqual({ name: "John Doe", exp: 1234567890 });
    });

    it("should throw an error for invalid JWT format", () => {
      const invalidToken = "invalid-token";
      expect(() => decodeJwt(invalidToken)).toThrowError();
    });
  });

  describe("getExpirationDate", () => {
    it("should calculate the expiration in days correctly", () => {
      const futureTimestamp = Math.floor(Date.now() / 1000) + 86400; // 1 day in the future
      const result = getExpirationDate(futureTimestamp);
      expect(result).toBeCloseTo(1, 0); // Close to 1 day
    });

    it("should return negative days for past timestamps", () => {
      const pastTimestamp = Math.floor(Date.now() / 1000) - 86400; // 1 day in the past
      const result = getExpirationDate(pastTimestamp);
      expect(result).toBeCloseTo(-1, 0); // Close to -1 day
    });
  });

  describe("isInFuture", () => {
    it("should return true for a future date", () => {
      const futureDate = new Date(Date.now() + 1000 * 60 * 60); // 1 hour in the future
      const result = isInFuture(futureDate);
      expect(result).toBe(true);
    });

    it("should return false for a past date", () => {
      const pastDate = new Date(Date.now() - 1000 * 60 * 60); // 1 hour in the past
      const result = isInFuture(pastDate);
      expect(result).toBe(false);
    });

    it("should return false for the current date", () => {
      const now = new Date();
      const result = isInFuture(now);
      expect(result).toBe(false); // Same as `Date.now()`
    });
  });

  describe("fromUnix", () => {
    it("should convert a Unix timestamp to a Date object", () => {
      const unixTimestamp = 1234567890; // Example Unix timestamp
      const result = fromUnix(unixTimestamp);
      expect(result).toEqual(new Date(unixTimestamp * 1000));
    });

    it("should handle zero Unix timestamp correctly", () => {
      const unixTimestamp = 0; // Epoch time
      const result = fromUnix(unixTimestamp);
      expect(result).toEqual(new Date(0));
    });
  });
});
