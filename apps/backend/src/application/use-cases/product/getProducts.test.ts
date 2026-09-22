import { productMock } from "@forit/domain";
import { MockedProductRepository } from "@infra/repos/mocks/mock-product-repo.js";
import { describe, test, expect } from "vitest";
import { getProducts } from "./getProducts.js";
//HAY QUE AGREGAR LOS DESCUENTOS A LOS PRODUCTOS

describe("getProduct", async () => {
  // const discountService = new MockedDiscountService([
  //   discountMock({
  //     active: true,
  //     productsApplied: ["1"],
  //     name: "OFERTAVERANO",
  //   }),
  // ]);
  test("Should return a array of products", async () => {
    const productRepository = new MockedProductRepository([
      productMock({ id: "1" }),
      productMock({ id: "2" }),
    ]);
    const result = await getProducts({ productRepository }, {});
    expect(result).toHaveLength(2);
  });
  test("if there are no products you should return an empty list", async () => {
    const productRepository = new MockedProductRepository([]);
    const result = await getProducts({ productRepository }, {});
    expect(result).toHaveLength(0);
    expect(result).toStrictEqual([]);
  });
});
