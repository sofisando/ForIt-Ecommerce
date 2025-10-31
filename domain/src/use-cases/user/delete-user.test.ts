import { describe, test, expect } from "vitest";
import { MockedUserService } from "../../services/mocks/mock-user-service";
import { userMock } from "../../entities/mocks/user-mock";
import { deleteUser } from "./delete-user";

describe("deleteUser", async () => {
  test("Should delete a user", async () => {
    const userService = new MockedUserService([
      userMock({ id: "1" }),
      userMock({ id: "2" }),
    ]);
    const result = await deleteUser({ userService }, { id: "1" });
    expect(result).toBeUndefined();

    const users = await userService.findAll();
    expect(users).toHaveLength(1);
  });
  test("Should throw if user not found", async () => {
    const userService = new MockedUserService([]);
    await expect(() =>
      deleteUser({ userService }, { id: "1" })
    ).rejects.toThrow("User not found");
  });
});
