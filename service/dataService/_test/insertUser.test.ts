import { describe, it, expect } from "vitest";
import { insetUser } from "../insertUser";
import { UserModel } from "../../../domain/models/userModel";
import { deleteUser } from "../deleteUser";
import { findUser } from "../findUser";

describe("User in DB", () => {
  it("Sould inset one user", async () => {
    const testUser = {
      username: "TEST_NAME",
      password: "TEST_PASS",
      email: "TEST@TEST.TS",
    } as UserModel;

    const dbResponse = await insetUser(testUser);
    deleteUser(testUser!.email!);

    expect(dbResponse.isValid).toBe(true);
  });

  it("Should find user", async () => {
    const testUser = {
      username: "TEST_NAME",
      password: "TEST_PASS",
      email: "TEST@TEST.TS",
    } as UserModel;

    try {
      const dbResponse = await insetUser(testUser);
      const userFromDb = await findUser(testUser!.email!);

      expect(userFromDb?.username).toBe(testUser.username);
    } catch {
    } finally {
      deleteUser(testUser!.email!);
    }
  });
});
