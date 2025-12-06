import { describe, test, expect } from "vitest";
import { MockedDiscountService } from "../../services/mocks/mock-discount-service";
import { discountMock } from "../../entities/mocks/discount-mock";
import { deleteDiscount } from "./delete-discount";
import { userMock } from "../../entities/mocks/user-mock";
import { MockedUserService } from "../../services/mocks/mock-user-service";

describe("deleteDiscount", async () => {
  const userService = new MockedUserService([
    userMock({ id: "user-1", role: "ADMIN" }),
    userMock({ id: "user-2", role: "CLIENT" }),
  ]);
  const discountService = new MockedDiscountService([
    discountMock({ id: "1" }),
    discountMock({ id: "2" }),
  ]);

  test("Should delete discount", async () => {
    const result = await deleteDiscount(
      { discountService, userService },
      { id: "1" , userId: "user-1" }
    );
    expect(result).toBeUndefined();

    const discounts = await discountService.findAll();
    expect(discounts).toHaveLength(1);
  });

  test("Should return error if discount not found", async () => {
    const result = await deleteDiscount(
      { discountService, userService },
      { id: "999" , userId: "user-1" }
    );
    expect(result).toStrictEqual(Error("Discount not found"));
  });

  test("Should return error if user not found", async () => {
    const result = await deleteDiscount(
      { discountService, userService },
      { id: "1" , userId: "user-999" }
    );
    expect(result).toStrictEqual(Error("User user-999 not found"));
  });

  test("Should return error if user is not ADMIN", async () => {
    const result = await deleteDiscount(
      { discountService, userService },
      { id: "1" , userId: "user-2" }
    );
    expect(result).toStrictEqual(Error("User is not ADMIN"));
  });
});
