import { describe, test, expect } from "vitest";
import { MockedProductService } from "../../services/mocks/mock-product-service";
import { productMock } from "../../entities/mocks/product-mock";
import { MockedDiscountService } from "../../services/mocks/mock-discount-service";
import { discountMock } from "../../entities/mocks/discount-mock";
import {
  applyDiscountsToProducts,
  ProductWithDiscountApplied,
} from "./applyDiscountsToProducts";

describe("applyDiscountsToProducts", () => {
  const discountService = new MockedDiscountService([
    discountMock({
      id: "1",
      name: "NOCHE DE LAS HELADERIAS",
      productsApplied: ["product1"],
      categoriesApplied: ["category2"],
      type: "FIXED_AMOUNT",
      value: 200,
      active: true,
    }),
  ]);

  const productService = new MockedProductService([
    productMock({
      id: "product1",
      categoryId: "category1",
      name: "Mouse",
      price: 49.99,
    }),
    productMock({
      id: "product2",
      categoryId: "category2",
      name: "Phone",
      price: 549.99,
    }),
  ]);

  test("applies discount to matching products", async () => {
    const result = await applyDiscountsToProducts(
      { discountService },
      productService.products
    );

    expect(result).toHaveLength(2);

    // product1 tiene descuento por productsApplied
    expect(result[0]!.discountApplied).toStrictEqual({
      id: "1",
      name: "NOCHE DE LAS HELADERIAS",
      type: "FIXED_AMOUNT",
      value: 200,
    });

    // product2 tiene descuento por categoriesApplied
    expect(result[1]!.discountApplied).toStrictEqual({
      id: "1",
      name: "NOCHE DE LAS HELADERIAS",
      type: "FIXED_AMOUNT",
      value: 200,
    });
  });

  test("returns single product enriched when input is single product", async () => {
    const product = productService.products[0]!; //toma el primer elemento del array de products

    const result = await applyDiscountsToProducts({ discountService }, product);

    expect(result.discountApplied).toStrictEqual({
      id: "1",
      name: "NOCHE DE LAS HELADERIAS",
      type: "FIXED_AMOUNT",
      value: 200,
    });
  });

  test("returns product with discountApplied = undefined when no discount found", async () => {
    const product = productMock({
      id: "not_exist",
      categoryId: "no_cat",
    });

    const result = await applyDiscountsToProducts({ discountService }, product);

    expect(result.discountApplied).toBeUndefined();
  });
});
