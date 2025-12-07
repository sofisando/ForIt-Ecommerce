import { describe, test, expect } from "vitest";
import { MockedVariantService } from "../../services/mocks/mock-variant-service";
import { variantMock } from "../../entities/mocks/variant-mock";
import { deleteVariant } from "./delete-variant";
import { MockedUserService } from "../../services/mocks/mock-user-service";
import { userMock } from "../../entities/mocks/user-mock";

describe("deleteVariant", async () => {
  const userService = new MockedUserService([
    userMock({ id: "user-1", role: "ADMIN" }),
    userMock({ id: "user-2", role: "CLIENT" }),
  ]);
  const variantService = new MockedVariantService([
    variantMock({ id: "1" }),
    variantMock({ id: "2" }),
  ]);

  test("Should delete variant", async () => {
    const result = await deleteVariant({ variantService, userService }, { id: "1", userId: "user-1" });
    expect(result).toBeUndefined();

    const variants = await variantService.findAll();
    expect(variants).toHaveLength(1);
  });
  test("Should return error if variant not found", async () => {
    const result = await deleteVariant({ variantService, userService }, { id: "999", userId: "user-1" });
    expect(result).toStrictEqual(Error("Variant not found"));
  });
  test("Should return error if user not found", async () => {
    const result = await deleteVariant({ variantService, userService }, { id: "2", userId: "user-999" });
    expect(result).toStrictEqual(Error("User user-999 not found"));
  });
  test("Should return error if user is not ADMIN", async () => {
    const result = await deleteVariant({ variantService, userService }, { id: "2", userId: "user-2" });
    expect(result).toStrictEqual(Error("User is not ADMIN"));
  });
});
