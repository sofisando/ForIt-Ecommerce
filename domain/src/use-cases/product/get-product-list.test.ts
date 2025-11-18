import { describe, test, expect } from "vitest";
import { MockedProductService } from "../../services/mocks/mock-product-service";
import { productMock } from "../../entities/mocks/product-mock";
import { getProductList } from "./get-product-list";
import { MockedDiscountService } from "../../services/mocks/mock-discount-service";
import { discountMock } from "../../entities/mocks/discount-mock";

describe("getProductList", async () => {
  const discountService = new MockedDiscountService([
    discountMock({
      active: true,
      productsApplied: ["1"],
      name: "OFERTAVERANO",
    }),
  ]);
  test("Should return a array of enriched products", async () => {
    const productService = new MockedProductService([
      productMock({ id: "1" }),
      productMock({ id: "2" }),
    ]); //acá ejecutamos el constructor del Mock de servicio y le metemos Mocks de usuario
    const result = await getProductList({ productService, discountService });
    expect(result).toHaveLength(2);
    expect(result[0]!.discountApplied?.name).toBe("OFERTAVERANO");
    expect(result[1]!.discountApplied).toBe(undefined); //enriched products
  });
  test("if there are no products you should return an empty list", async () => {
    const productService = new MockedProductService([]);
    const result = await getProductList({ productService, discountService });
    expect(result).toHaveLength(0);
    expect(result).toStrictEqual([]);
  });
});
