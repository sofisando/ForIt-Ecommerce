import { describe, test, expect } from "vitest";
import { MockedProductService } from "../../services/mocks/mock-product-service";
import { productMock } from "../../entities/mocks/product-mock";
import { getProductsSearch } from "./get-products-search";

describe("getProductsSearch", () => {
  test("should return products that match the query", async () => {
    const productService = new MockedProductService([
      productMock({ name: "Red Mouse" }),
      productMock({ name: "Blue Keyboard" }),
      productMock({ name: "Gaming Mouse Pad" }),
    ]);

    const result = await getProductsSearch(
      { productService },
      { query: "mouse" }
    );

    expect(result).toHaveLength(2);
    expect(result[0]!.name.toLowerCase()).toContain("mouse");
    expect(result[1]!.name.toLowerCase()).toContain("mouse");
  });

  test("should return an empty array if no matches", async () => {
    const productService = new MockedProductService([
      productMock({ name: "Red Mouse" }),
    ]);

    const result = await getProductsSearch(
      { productService },
      { query: "keyboard" }
    );

    expect(result).toHaveLength(0);
    expect(result).toStrictEqual([]);
  });
});
