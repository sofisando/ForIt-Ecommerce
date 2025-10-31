import { describe, expect, test } from "vitest";
import { UserRole } from "../../entities/user.js";
import { MockedUserService } from "../../services/mocks/mock-user-service.js";
import { userMock } from "../../entities/mocks/user-mock.js";
import { editUser } from "./edit-user.js";

describe("editUser", async () => {
  const userService = new MockedUserService([
    userMock({
      id: "1",
      name: "Carlitos",
      email: "Carlitos@gmail.com",
      password: "user1234",
      DNI: "87673527",
      role: UserRole.CLIENT,
    }),
    userMock(),
  ]);

  test("When edit a user you should update info user", async () => {
    const result = await editUser(
      { userService },
      {
        id: "1",
        name: "Sofia",
        email: "sofia@gmail.com",
        password: "User@1234",
        DNI: "87673527",
        role: UserRole.ADMIN,
      }
    );

    expect(result).toStrictEqual({
      id: "1",
      name: "Sofia",
      email: "sofia@gmail.com",
      password: "User@1234",
      DNI: "87673527",
      role: UserRole.ADMIN,
    });
  });

  test("Should throw if user not found", async () => {
    await expect(editUser({ userService }, { id: "999" })).rejects.toThrow(
      "User not found"
    );
  });
});
