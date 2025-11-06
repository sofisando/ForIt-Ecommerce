import { describe, expect, test } from "vitest";
import { MockedDiscountService } from "../../services/mocks/mock-discount-service";
import { discountMock } from "../../entities/mocks/discount-mock";
import { faker } from "@faker-js/faker";
import { createDiscount } from "./create-discount";

describe("createDiscount", async () => {
  const discountService = new MockedDiscountService([discountMock()]);
  const DataFrom = faker.date.past();
  const DataTo = faker.date.future();

  test("should create a new discount with productsApplied", async () => {
    await createDiscount(
      { discountService },
      {
        name: "OFERTAVERANO",
        type: "PERCENTAGE",
        value: 50,
        productsApplied: ["idProduct1", "idProduct2"],
        categoriesApplied: undefined,
        active: true,
        dateFrom: DataFrom,
        dateTo: DataTo,
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
      { discountService },
      {
        name: "OFERTAHALLOWING",
        type: "PERCENTAGE",
        value: 50,
        productsApplied: undefined,
        categoriesApplied: ["idCategory1", "idCategory2"],
        active: true,
        dateFrom: DataFrom,
        dateTo: DataTo,
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

  test("If the name is already registered it should return an error.", async () => {
    const result = await createDiscount(
      { discountService },
      {
        name: "OFERTAVERANO",
        type: "PERCENTAGE",
        value: 50,
        productsApplied: ["idProduct1", "idProduct2"],
        categoriesApplied: undefined,
        active: true,
        dateFrom: DataFrom,
        dateTo: DataTo,
      }
    );

    expect(result).toBeInstanceOf(Error);
  });
});
