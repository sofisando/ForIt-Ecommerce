import {
  DNI,
  Email,
  PasswordHash,
  UnauthorizedError,
  userMock,
  UserNotFoundError,
  UserRole,
} from "@forit/domain";
import { MockedUserRepository } from "@infra/repos/mocks/mock-user-repo.js";
import { describe, expect, test } from "vitest";
import { updateUser } from "./updateUser.js";

describe("updateUser", async () => {
  test("When ADMIN edit a user, should update info user", async () => {
    const userRepository = new MockedUserRepository([
      userMock({
        id: "1",
        name: "Carlitos",
        email: new Email("Carlitos@gmail.com"),
        passwordHash: new PasswordHash("hashed-12345678"),
        DNI: new DNI("87673527"),
        role: UserRole.CLIENT,
      }),
    ]);
    const result = await updateUser(
      { userRepository },
      {
        actor: { userId: "unAdmin1", role: UserRole.ADMIN },
        targetUserId: "1",
        dto: { name: "Carlos" },
      },
    );

    expect(userRepository.users).toHaveLength(1);
    expect(result.name).toBe("Carlos");
    expect(result.email.getValue()).toBe("Carlitos@gmail.com");
    expect(result.id).toBe("1");
  });

  test("When CLIENT edit own profile user, should update info", async () => {
    const userRepository = new MockedUserRepository([
      userMock({
        id: "1",
        name: "Carlitos",
        email: new Email("Carlitos@gmail.com"),
        passwordHash: new PasswordHash("hashed-12345678"),
        DNI: new DNI("87673527"),
        role: UserRole.CLIENT,
      }),
    ]);
    const result = await updateUser(
      { userRepository },
      {
        actor: { userId: "1", role: UserRole.CLIENT },
        targetUserId: "1",
        dto: { name: "Carlos" },
      },
    );

    expect(userRepository.users).toHaveLength(1);
    expect(result.name).toBe("Carlos");
    expect(result.email.getValue()).toBe("Carlitos@gmail.com");
    expect(result.id).toBe("1");
  });

  test("It should throw an error if the user is not ADMIN or the CLIENT does not edit their own user", async () => {
    const userRepository = new MockedUserRepository([
      userMock({
        id: "1",
        name: "Carlitos",
        email: new Email("Carlitos@gmail.com"),
        passwordHash: new PasswordHash("hashed-12345678"),
        DNI: new DNI("87673527"),
        role: UserRole.CLIENT,
      }),
    ]);
    await expect(
      updateUser(
        { userRepository },
        {
          actor: { userId: "2222", role: UserRole.CLIENT },
          targetUserId: "1",
          dto: { name: "Carlos" },
        },
      ),
    ).rejects.toThrow(UnauthorizedError);
  });

  test("Should throw an error if user not found", async () => {
    const userRepository = new MockedUserRepository([])
    await expect(
      updateUser(
        { userRepository },
        {
          actor: { userId: "2222", role: UserRole.ADMIN },
          targetUserId: "1",
          dto: { name: "Carlos" },
        },
      ),
    ).rejects.toThrow(UserNotFoundError);
  });
});
