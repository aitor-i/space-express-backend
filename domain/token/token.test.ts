import { describe, it, expect } from "vitest";

import Token from "./token";

describe("Token", () => {
  it("should generate token", () => {
    const username = "John";
    const token = new Token();

    token.generateToken(username);
    const stringToken = token.getToken();

    expect(stringToken).toBeTypeOf("string");
    expect(stringToken).toBeDefined();
  });

  it("shuld return username from token", () => {
    const username = "John";
    const token = new Token();

    token.generateToken(username);
    const stringToken = token.getToken();
    const usernameFromToken = token.getUser(stringToken);

    expect(usernameFromToken).toBe(username);
  });
});
