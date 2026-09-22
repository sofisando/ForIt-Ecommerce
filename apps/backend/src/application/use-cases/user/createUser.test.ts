import { Email, PasswordHash, UserAlreadyExistsError, userMock, UserRole } from "@forit/domain";
import { MockedUserRepository } from "@infra/repos/mocks/index.js";
import { describe, expect, test } from "vitest";
import { createUser } from "./createUser.js";
import { MockPasswordHasher } from "@infra/services/mocks/index.js";

describe("createUser", async () => {
  //despues poner el servicio de Email
  const passwordHasher = new MockPasswordHasher();

  test("should create a user", async () => {
    const userRepository = new MockedUserRepository([]);
    const result = await createUser(
      { userRepository, passwordHasher },
      {
        name: "nuevoUser",
        email: "nuevoUser@gmail.com",
        password: "User@1234",
        DNI: "87673527",
      },
    );

    expect(userRepository.users).toHaveLength(1);
    expect(result.passwordHash.getValue()).toBe("hashed-User@1234");
    expect(result.name).toBe("nuevoUser");
    expect(result.email.getValue()).toBe("nuevoUser@gmail.com");
    expect(result.DNI.getValue()).toBe("87673527");
  });
  // expect(emailService.sent.length).toBe(1);
  // expect(emailService.sent[0]).toMatchObject({
  //   to: "sofia@gmail.com",
  //   subject: "¡Bienvenido!",
  // });

  test("If the email is already registered it should return an error.", async () => {
    const userRepository = new MockedUserRepository([
      userMock({ email: new Email("nuevoUser@gmail.com") }),
    ]);

    await expect (createUser(
      { userRepository, passwordHasher },
      {
        name: "nuevoUser",
        email: "nuevoUser@gmail.com",
        password: "User@1234",
        DNI: "87673527",
      },
    )).rejects.toThrow(UserAlreadyExistsError);
  });
});
