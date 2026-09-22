import {
  Email,
  IncorrectPasswordError,
  PasswordHash,
  userMock,
  UserNotFoundError,
} from "@forit/domain";
import { MockedUserRepository } from "@infra/repos/mocks/mock-user-repo.js";
import {
  MockPasswordHasher,
  MockTokenProvider,
} from "@infra/services/mocks/index.js";
import { describe, test, expect } from "vitest";
import { loginUser } from "./loginUser.js";

describe("loginUser", () => {
  const userRepository = new MockedUserRepository([
    userMock({
      id: "1",
      email: new Email("user@gmail.com"),
      passwordHash: new PasswordHash("hashed-12345678"),
    }),
  ]);
  const passwordHasher = new MockPasswordHasher();
  const tokenProvider = new MockTokenProvider();

  test("Should login the user with correct credentials", async () => {
    const result = await loginUser(
      { userRepository, passwordHasher, tokenProvider },
      { email: "user@gmail.com", password: "12345678" },
    );
    
    expect(result).toBeDefined();
    expect(result.token).toBe("mock-token-1");
    expect(result.user.email).toBe("user@gmail.com");
  });

  test("Should return throw error if email does not exist", async () => {
    await expect(
      loginUser(
        { userRepository, passwordHasher, tokenProvider },
        {
          email: "noexiste@gmail.com",
          password: "1234",
        },
      ),
    ).rejects.toThrow(UserNotFoundError);
  });

  test("Should return throw error if password is invalid", async () => {
    await expect(
      loginUser(
        { userRepository, passwordHasher, tokenProvider },
        {
          email: "user@gmail.com",
          password: "wrongpassword",
        },
      ),
    ).rejects.toThrow(IncorrectPasswordError);
  });
});
