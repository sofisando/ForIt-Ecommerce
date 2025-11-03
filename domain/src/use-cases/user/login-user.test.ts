import { describe, test, expect } from "vitest";
import { MockedUserService } from "../../services/mocks/mock-user-service";
import { MockedAuthService } from "../../services/mocks/mock-auth-service";
import { userMock } from "../../entities/mocks/user-mock";
import { loginUser } from "./login-user";

describe("loginUser", () => {
  const userService = new MockedUserService([
    userMock({ email: "prueba@gmail.com", password: "hashed-securepassword" }),
  ]);

  const authService = new MockedAuthService();

  test("Should login the user with correct credentials", async () => {
    const result = await loginUser(
      { userService, authService },
      "prueba@gmail.com",
      "securepassword"
    );

    expect(result).toBeDefined();
    expect(result?.email).toBe("prueba@gmail.com");
  });

  test("Should return null if email does not exist", async () => {
    const result = await loginUser(
      { userService, authService },
      "noexiste@gmail.com",
      "1234"
    );

    expect(result).toBeNull();
  });

  test("Should return null if password is invalid", async () => {
    const result = await loginUser(
      { userService, authService },
      "prueba@gmail.com",
      "wrongpassword"
    );

    expect(result).toBeNull();
  });
});
