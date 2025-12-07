import { describe, test, expect } from "vitest";
import { MockedVariantService } from "../../services/mocks/mock-variant-service";
import { variantMock } from "../../entities/mocks/variant-mock";
import { getVariantList } from "./get-variant-list";
import { MockedUserService } from "../../services/mocks/mock-user-service";
import { userMock } from "../../entities/mocks/user-mock";

describe("getVariantList", async () => {
  const userService = new MockedUserService([
    userMock({ id: "user-1", role: "ADMIN" }),
    userMock({ id: "user-2", role: "CLIENT" }),
  ]);
  const variantService = new MockedVariantService([
    variantMock(),
    variantMock(),
  ]);
  test("Should return a array of variants", async () => {
    const result = await getVariantList(
      { variantService, userService },
      { userId: "user-1" }
    );
    expect(result).toHaveLength(2);
    expect(result).toStrictEqual(variantService.variants);
  });
  test("if there are no variants you should return an empty list", async () => {
    const variantService = new MockedVariantService([]);
    const result = await getVariantList(
      { variantService, userService },
      { userId: "user-1" }
    );
    expect(result).toHaveLength(0);
    expect(result).toStrictEqual([]);
  });
  test("Should return error if user not found", async () => {
    const result = await getVariantList(
      { variantService, userService },
      { userId: "user-999" }
    );
    expect(result).toStrictEqual(Error("User user-999 not found"));
  });
  test("Should return error if user is not ADMIN", async () => {
    const result = await getVariantList(
      { variantService, userService },
      { userId: "user-2" }
    );
    expect(result).toStrictEqual(Error("User is not ADMIN"));
  });
});
