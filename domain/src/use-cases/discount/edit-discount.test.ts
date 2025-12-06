import { describe, expect, test } from "vitest";
import { MockedDiscountService } from "../../services/mocks/mock-discount-service";
import { discountMock } from "../../entities/mocks/discount-mock";
import { faker } from "@faker-js/faker";
import { editDiscount } from "./edit-discount";
import { userMock } from "../../entities/mocks/user-mock";
import { MockedUserService } from "../../services/mocks/mock-user-service";

describe("editDiscount", async () => {
  const DataFrom = faker.date.past();
  const DataTo = faker.date.future();
  const discountService = new MockedDiscountService([
    discountMock({
      id: "1",
      name: "DESCUENTOINVIERNO",
      type: "FIXED_AMOUNT",
      value: 5000,
      productsApplied: ["idProduct1", "idProduct2"],
      categoriesApplied: ["idCategory1"],
      active: true,
      dateFrom: DataFrom,
      dateTo: DataTo,
    }),
  ]);
  const userService = new MockedUserService([
    userMock({ id: "user-1", role: "ADMIN" }),
    userMock({ id: "user-2", role: "CLIENT" }),
  ]);

  test("When edit a discount you should update info discount", async () => {
    const result = await editDiscount(
      { discountService, userService },
      { userId: "user-1", 
        data: { id: "1", name: "PROMOVERANO", value: 7000 }
      }
    );

    expect(result).toStrictEqual({
      id: "1",
      name: "PROMOVERANO",
      type: "FIXED_AMOUNT",
      value: 7000,
      productsApplied: ["idProduct1", "idProduct2"],
      categoriesApplied: ["idCategory1"],
      active: true,
      dateFrom: DataFrom,
      dateTo: DataTo,
    });
  });

  test("Should return error if discount not found", async () => {
    const result = await editDiscount(
      { discountService, userService },
      { userId: "user-1", 
        data: { id: "999", name: "PROMOVERANO", value: 7000 }
      }
    );
    expect(result).toStrictEqual(Error("Discount not found"))
  });

  test("Should return error if user not found", async () => {
    const result = await editDiscount(
      { discountService, userService },
      { userId: "user-999", 
        data: { id: "1", name: "PROMOVERANO", value: 7000 }
      }
    );
    expect(result).toStrictEqual(Error("User user-999 not found"))
  });

  test("Should return error if user is not ADMIN", async () => {
    const result = await editDiscount(
      { discountService, userService },
      { userId: "user-2", 
        data: { id: "1", name: "PROMOVERANO", value: 7000 }
      }
    );
    expect(result).toStrictEqual(Error("User is not ADMIN"))
  });
});
