import { UnauthorizedError, userMock, UserRole } from "@forit/domain";
import { MockedUserRepository } from "@infra/repos/mocks/mock-user-repo.js";
import { describe, test, expect } from "vitest";
import { getUsers } from "./getUsers.js";

describe("getUsers", async () => {
  const userRepository = new MockedUserRepository([
    userMock({ id: "user-1", role: "ADMIN" }),
    userMock({ id: "user-2", role: "CLIENT" }),
    userMock(),
  ]);

  test("Should return a array of users", async () => {
    const result = await getUsers(
      { userRepository },
      { actor: { userId: "user-2", role: UserRole.ADMIN }, dto: {} },
    );
    expect(result).toHaveLength(3);
    expect(result).toStrictEqual(userRepository.users);
  });

  test("Should return error if user is not ADMIN", async () => {
    await expect(
      getUsers(
        { userRepository },
        { actor: { userId: "user-2", role: UserRole.CLIENT }, dto: {} },
      ),
    ).rejects.toThrow(UnauthorizedError);
  });
});
