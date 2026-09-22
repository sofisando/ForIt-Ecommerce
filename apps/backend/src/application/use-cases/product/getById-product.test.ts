import { productMock, ProductNotFoundError } from "@forit/domain";
import { MockedProductRepository } from "@infra/repos/mocks/mock-product-repo.js";
import { describe, test, expect } from "vitest";
import { getProductById } from "./getById-product.js";
//HAY QUE AGREGAR LOS DESCUENTOS A LOS PRODUCTOS

describe("getProductById", async () => {
  // const discountService = new MockedDiscountService([
  //   discountMock({
  //     active: true,
  //     productsApplied: ["1"],
  //     name: "OFERTAVERANO",
  //   }),
  // ]);
  test("Should return a product by id", async () => {
    const productRepository = new MockedProductRepository([
      productMock({ id: "1" }),
    ]);
    const result = await getProductById({ productRepository }, { id: "1" });
    expect(result.id).toBe("1");
  });
  test("Should return error if product not found", async () => {
    const productRepository = new MockedProductRepository([]);
    await expect(
      getProductById({ productRepository }, { id: "999" }),
    ).rejects.toThrow(ProductNotFoundError);
  });
});
