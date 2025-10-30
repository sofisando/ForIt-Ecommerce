import { describe, expect, test } from "vitest";
import { UserRole } from "../../entities/user.js";
import { register } from "./register.js";
import { MockedUserService } from "../../services/mocks/mock-user-service.js";
import { userMock } from "../../entities/mocks/user-mock.js";

describe("register", async () => {
  const userService = new MockedUserService([
    userMock({
      id: crypto.randomUUID(),
      name: "user",
      email: "user@gmail.com",
      password: "user1234",
      role: UserRole.CLIENT,
    }),
  ]);

  test("When registering a user you should create the user", async () => {
    const result = await register(
      { userService },
      { name: "Sofia", email: "sofia@gmail.com", password: "User@1234", DNI: "87673527", role: UserRole.CLIENT }
    );

    expect(result).toBeUndefined();
    expect(userService.users).toHaveLength(2);
    expect(userService.users[1]).toStrictEqual({
      id: expect.any(String),
      name: "Sofia",
      email: "sofia@gmail.com",
      password: "User@1234",
      DNI: "87673527", 
      role: UserRole.CLIENT,
    });
  });

  test("If the email is already registered it should return an error.", async () => {
    const result = await register(
      { userService },
      { name: "Sofia", email: "sofia@gmail.com", password: "User@1234", DNI: "87673527", role: UserRole.CLIENT }
    );

    expect(result).toBeInstanceOf(Error);
  });
});
