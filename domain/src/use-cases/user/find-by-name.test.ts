import { describe, test, expect } from "vitest";
import { MockedUserService } from "../../services/mocks/mock-user-service";
import { userMock } from "../../entities/mocks/user-mock";
import { findByName } from "./find-by-name";

describe("findByName", async () => {
  const userService = new MockedUserService([
    userMock({ name: "Alice" }),
    userMock({ name: "Bob" }),
  ]);

  test("Should find the user by name", async () => {
    const result = await findByName({ userService }, { name: "Bob" });
    expect(result).toBeDefined();
    expect(result?.name).toBe("Bob");
  });
  test("Should throw if user not found by name", async () => {
    await expect(() =>
      findByName({ userService }, { name: "Charlie" })
    ).rejects.toThrow("User not found");
  });
});