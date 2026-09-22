import {
  IncorrectPasswordError,
  PasswordHash,
  PasswordReuseError,
  userMock,
  UserNotFoundError,
  UserRole,
} from "@forit/domain";
import { MockedUserRepository } from "@infra/repos/mocks/mock-user-repo.js";
import { MockPasswordHasher } from "@infra/services/mocks/index.js";
import { describe, test, expect } from "vitest";
import { changePassword } from "./changePassword.js";

describe("changePassword", () => {
  const passwordHasher = new MockPasswordHasher();

  test("Should change password with correct credentials", async () => {
    const userRepository = new MockedUserRepository([
      userMock({
        id: "1",
        passwordHash: new PasswordHash("hashed-12345678"),
      }),
    ]);
    const result = await changePassword(
      { userRepository, passwordHasher },
      {
        actor: { userId: "1", role: UserRole.CLIENT },
        dto: { currentPassword: "12345678", newPassword: "nuevaPassword" },
      },
    );

    expect(result).toBeDefined();
    expect(result.passwordHash.getValue()).toBe("hashed-nuevaPassword");
  });

  test("Should return throw error if password is invalid", async () => {
    const userRepository = new MockedUserRepository([
      userMock({
        id: "1",
        passwordHash: new PasswordHash("hashed-12345678"),
      }),
    ]);
    await expect(
      changePassword(
        { userRepository, passwordHasher },
        {
          actor: { userId: "1", role: UserRole.CLIENT },
          dto: {
            currentPassword: "invalidPassword",
            newPassword: "nuevaPassword",
          },
        },
      ),
    ).rejects.toThrow(IncorrectPasswordError);
  });

  test("Should return throw error if the newPassword is equal", async () => {
    const userRepository = new MockedUserRepository([
      userMock({
        id: "1",
        passwordHash: new PasswordHash("hashed-12345678"),
      }),
    ]);
    await expect(
      changePassword(
        { userRepository, passwordHasher },
        {
          actor: { userId: "1", role: UserRole.CLIENT },
          dto: { currentPassword: "12345678", newPassword: "12345678" },
        },
      ),
    ).rejects.toThrow(PasswordReuseError);
  });

  test("Should return throw error if user is not found", async () => {
    const userRepository = new MockedUserRepository([
      userMock({
        id: "1",
        passwordHash: new PasswordHash("hashed-12345678"),
      }),
    ]);
    await expect(
      changePassword(
        { userRepository, passwordHasher },
        {
          actor: { userId: "22222", role: UserRole.CLIENT },
          dto: { currentPassword: "12345678", newPassword: "nuevaPassword" },
        },
      ),
    ).rejects.toThrow(UserNotFoundError);
  });
});
