import { describe, expect, test } from "vitest";
import { MockedDiscountService } from "../../services/mocks/mock-discount-service";
import { discountMock } from "../../entities/mocks/discount-mock";
import { faker } from "@faker-js/faker";
import { editDiscount } from "./edit-discount";

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

  test("When edit a discount you should update info discount", async () => {
    const result = await editDiscount(
      { discountService },
      { id: "1", name: "PROMOVERANO", value: 7000 }
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

  test("Should throw if discount not found", async () => {
    await expect(
      editDiscount({ discountService }, { id: "999" })
    ).rejects.toThrow("Discount not found");
  });
});
