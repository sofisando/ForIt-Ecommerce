import { describe, test, expect } from "vitest";
import { MockedDiscountService } from "../../services/mocks/mock-discount-service";
import { discountMock } from "../../entities/mocks/discount-mock";
import { deleteDiscount } from "./delete-discount";


describe("deleteDiscount", async () => {
  test("Should delete discount", async () => {
    const discountService = new MockedDiscountService([
      discountMock({ id: "1" }),
      discountMock({ id: "2" }),
    ]);
    const result = await deleteDiscount({ discountService }, { id: "1" });
    expect(result).toBeUndefined();

    const discounts = await discountService.findAll();
    expect(discounts).toHaveLength(1);

  });
  test("Should throw if discount not found", async () => {
    const discountService = new MockedDiscountService([]);
    await expect(() =>
      deleteDiscount({ discountService }, { id: "1" })
    ).rejects.toThrow("Discount not found");
  });
});

