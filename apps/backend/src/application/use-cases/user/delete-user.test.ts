import { UnauthorizedError, userMock, UserRole } from "@forit/domain";
import { MockedUserRepository } from "@infra/repos/mocks/mock-user-repo.js";
import { describe, test, expect } from "vitest";
import { deleteUser } from "./deleteUser.js";

describe("deleteUser", async () => {
  test("Should delete a user", async () => {
    const userRepository = new MockedUserRepository([
      userMock({ id: "1" })
    ]);
    const result = await deleteUser(
      { userRepository },
      {
        actor: { userId: "user-1", role: UserRole.ADMIN },
        dto: { id: "1" },
      },
    );
    expect(result).toBeUndefined();

    const users = await userRepository.getAll();
    expect(users).toHaveLength(0);
  });
  test("Should throw if user is not ADMIN", async () => {
    const userRepository = new MockedUserRepository([]);
    await expect(() =>
      deleteUser(
      { userRepository },
      {
        actor: { userId: "user-1", role: UserRole.CLIENT },
        dto: { id: "1" },
      },  
      ),
    ).rejects.toThrow(UnauthorizedError);
  });
});
