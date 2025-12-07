import { describe, test, expect } from "vitest";
import { MockedUserService } from "../../services/mocks/mock-user-service";
import { userMock } from "../../entities/mocks/user-mock";
import { getUserList } from "./get-user-list";

describe("getUserList", async () => {
  const userService = new MockedUserService([
    userMock({ id: "user-1", role: "ADMIN" }),
    userMock({ id: "user-2", role: "CLIENT" }),
    userMock(),
  ]);

  test("Should return a array of users", async () => {
    const result = await getUserList({ userService }, { userId: "user-1" });
    expect(result).toHaveLength(3);
    expect(result).toStrictEqual(userService.users);
  });
  
  test("Should return error if user not found", async () => {
    const result = await getUserList({ userService }, { userId: "user-999" });
    expect(result).toStrictEqual(Error("User user-999 not found"));
  });

  test("Should return error if user is not ADMIN", async () => {
    const result = await getUserList({ userService }, { userId: "user-2" });
    expect(result).toStrictEqual(Error("User is not ADMIN"));
  });
});
