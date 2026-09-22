import { Email, UnauthorizedError, userMock, UserNotFoundError, UserRole } from "@forit/domain";
import { MockedUserRepository } from "@infra/repos/mocks/mock-user-repo.js";
import { describe, test, expect } from "vitest";
import { getUserByEmail } from "./getByEmailUser.js";

describe("getUserByEmail", async () => {
  test("Should find the user by email", async () => {
    const userRepository = new MockedUserRepository([
      userMock({ email: new Email("user@gmail.com") }),
    ]);
    const result = await getUserByEmail(
      { userRepository },
      {
        actor: { userId: "user-1", role: UserRole.ADMIN },
        dto: { email: "user@gmail.com" },
      },
    );
    expect(result).toBeDefined();
    expect(result?.email.getValue()).toBe("user@gmail.com");
  });
  test("Should throw if user is not ADMIN ", async () => {
    const userRepository = new MockedUserRepository([
      userMock({ email: new Email("user@gmail.com") }),
    ]);
    await expect(() =>
      getUserByEmail(
        { userRepository },
        {
          actor: { userId: "user-1", role: UserRole.CLIENT },
          dto: { email: "user@gmail.com" },
        },
      ),
    ).rejects.toThrow(UnauthorizedError);
  });
  test("Should throw if user not found", async () => {
    const userRepository = new MockedUserRepository([])
    await expect(() =>
      getUserByEmail(
        { userRepository },
        {
          actor: { userId: "user-1", role: UserRole.ADMIN },
          dto: { email: "noExist@gmail.com" },
        },
      ),
    ).rejects.toThrow(UserNotFoundError);
  });
});
