import { Email, UnauthorizedError, userMock, UserNotFoundError, UserRole } from "@forit/domain";
import { MockedUserRepository } from "@infra/repos/mocks/mock-user-repo.js";
import { describe, test, expect } from "vitest";
import { getUserById } from "./getByIdUser.js";

describe("getUserById", async () => {
  test("Should find the user by id", async () => {
    const userRepository = new MockedUserRepository([
      userMock({ id: "1" }),
    ]);
    const result = await getUserById(
      { userRepository },
      {
        actor: { userId: "user-1", role: UserRole.ADMIN },
        dto: { id: "1" },
      },
    );
    expect(result).toBeDefined();
    expect(result?.id).toBe("1");
  });
  test("Should throw if user is not ADMIN ", async () => {
    const userRepository = new MockedUserRepository([
      userMock({ id: "1" }),
    ]);
    await expect(() =>
      getUserById(
        { userRepository },
        {
          actor: { userId: "user-1", role: UserRole.CLIENT },
          dto: { id: "1" },
        },
      ),
    ).rejects.toThrow(UnauthorizedError);
  });
  test("Should throw if user not found", async () => {
    const userRepository = new MockedUserRepository([])
    await expect(() =>
      getUserById(
        { userRepository },
        {
          actor: { userId: "user-1", role: UserRole.ADMIN },
          dto: { id: "1" },
        },
      ),
    ).rejects.toThrow(UserNotFoundError);
  });
});
