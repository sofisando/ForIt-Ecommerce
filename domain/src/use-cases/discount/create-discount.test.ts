import { describe, expect, test } from "vitest";
import { MockedDiscountService } from "../../services/mocks/mock-discount-service";
import { discountMock } from "../../entities/mocks/discount-mock";
import { faker } from "@faker-js/faker";
import { createDiscount } from "./create-discount";
import { MockedUserService } from "../../services/mocks/mock-user-service";
import { userMock } from "../../entities/mocks/user-mock";

describe("createDiscount", async () => {
  const discountService = new MockedDiscountService([discountMock()]);
  const DataFrom = faker.date.past();
  const DataTo = faker.date.future();
  const userService = new MockedUserService([
    userMock({ id: "user-1", role: "ADMIN" }),
    userMock({ id: "user-2", role: "CLIENT" }),
  ]);

  test("should create a new discount with productsApplied", async () => {
    await createDiscount(
      { discountService, userService },
      {
        userId: "user-1",
        data: {
          name: "OFERTAVERANO",
          type: "PERCENTAGE",
          value: 50,
          productsApplied: ["idProduct1", "idProduct2"],
          categoriesApplied: undefined,
          active: true,
          dateFrom: DataFrom,
          dateTo: DataTo,
        },
      }
    );

    expect(discountService.discounts).toHaveLength(2);
    expect(discountService.discounts[1]).toStrictEqual({
      id: expect.any(String),
      name: "OFERTAVERANO",
      type: "PERCENTAGE",
      value: 50,
      productsApplied: ["idProduct1", "idProduct2"],
      categoriesApplied: undefined,
      active: true,
      dateFrom: DataFrom,
      dateTo: DataTo,
    });
  });

  test("should create a new discount with categoriesApplied", async () => {
    await createDiscount(
      { discountService, userService },
      {
        userId: "user-1",
        data: {
          name: "OFERTAHALLOWING",
          type: "PERCENTAGE",
          value: 50,
          productsApplied: undefined,
          categoriesApplied: ["idCategory1", "idCategory2"],
          active: true,
          dateFrom: DataFrom,
          dateTo: DataTo,
        },
      }
    );

    expect(discountService.discounts).toHaveLength(3);
    expect(discountService.discounts[2]).toStrictEqual({
      id: expect.any(String),
      name: "OFERTAHALLOWING",
      type: "PERCENTAGE",
      value: 50,
      productsApplied: undefined,
      categoriesApplied: ["idCategory1", "idCategory2"],
      active: true,
      dateFrom: DataFrom,
      dateTo: DataTo,
    });
  });

  test("If the name is already registered it should return error.", async () => {
    const result = await createDiscount(
      { discountService, userService },
      {
        userId: "user-1",
        data: {
          name: "OFERTAVERANO",
          type: "PERCENTAGE",
          value: 50,
          productsApplied: ["idProduct1", "idProduct2"],
          categoriesApplied: undefined,
          active: true,
          dateFrom: DataFrom,
          dateTo: DataTo,
        },
      }
    );

    expect(result).toStrictEqual(Error("Name OFERTAVERANO is already created"));
  });

  test("Should return error if user not found", async () => {
    const result = await createDiscount(
      { discountService, userService },
      {
        userId: "user-999",
        data: {
          name: "OFERTAVERANO",
          type: "PERCENTAGE",
          value: 50,
          productsApplied: ["idProduct1", "idProduct2"],
          categoriesApplied: undefined,
          active: true,
          dateFrom: DataFrom,
          dateTo: DataTo,
        },
      }
    );

    expect(result).toStrictEqual(Error("User user-999 not found"));
  });
  
  test("Should return error if user is not ADMIN", async () => {
    const result = await createDiscount(
      { discountService, userService },
      {
        userId: "user-2",
        data: {
          name: "OFERTAVERANO",
          type: "PERCENTAGE",
          value: 50,
          productsApplied: ["idProduct1", "idProduct2"],
          categoriesApplied: undefined,
          active: true,
          dateFrom: DataFrom,
          dateTo: DataTo,
        },
      }
    );

    expect(result).toStrictEqual(Error("User is not ADMIN"));
  });
});
