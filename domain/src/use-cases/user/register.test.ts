import { describe, expect, test } from "vitest";
import { UserRole } from "../../entities/user.js";
import { register } from "./register.js";
import { MockedUserService } from "../../services/mocks/mock-user-service.js";
import { userMock } from "../../entities/mocks/user-mock.js";
import { MockedEmailService } from "../../services/mocks/mock-email-service.js";

describe("register", async () => {
  const emailService = new MockedEmailService();
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
      { userService, emailService },
      {
        name: "Sofia",
        email: "sofia@gmail.com",
        password: "User@1234",
        DNI: "87673527",
        role: UserRole.CLIENT,
      }
    );

    expect(userService.users).toHaveLength(2);
    expect(userService.users[1]).toStrictEqual({
      id: expect.any(String),
      name: "Sofia",
      email: "sofia@gmail.com",
      password: "User@1234",
      DNI: "87673527",
      role: UserRole.CLIENT,
    });
    expect(emailService.sent.length).toBe(1);
    expect(emailService.sent[0]).toMatchObject({
      to: "sofia@gmail.com",
      subject: "¡Bienvenido!",
    });
  });

  test("If the email is already registered it should return an error.", async () => {
    const result = await register(
      { userService, emailService },
      {
        name: "Sofia",
        email: "sofia@gmail.com",
        password: "User@1234",
        DNI: "87673527",
        role: UserRole.CLIENT,
      }
    );

    expect(result).toStrictEqual(Error("Email sofia@gmail.com is already registered"));
  });
});
