import { describe, it, expect } from "vitest";
import { UserModel, insetUser } from "../insertUser";

describe("Insert user", () => {
  it("Sould inset one user", async () => {
    const username = process.env.MONGO_ROOT_USERNAME;
    console.log("TEST username", username);
    const testUser = {
      username: "TEST_NAME",
      password: "TEST_PASS",
      email: "TEST@TEST.TS",
    } as UserModel;

    const dbResponse = await insetUser(testUser);

    expect(dbResponse.acknowledged).toBe(true);
  });
});
