import { describe, test, expect } from "vitest";
import { MockedProductService } from "../../services/mocks/mock-product-service";
import { productMock } from "../../entities/mocks/product-mock";
import { deleteProduct } from "./delete-product";


describe("deleteProduct", async () => {
  test("Should delete product", async () => {
    const productService = new MockedProductService([
      productMock({ id: "1" }),
      productMock({ id: "2" }),
    ]);
    const result = await deleteProduct({ productService }, { id: "1" });
    expect(result).toBeUndefined();

    const products = await productService.findAll();
    expect(products).toHaveLength(1);
  });
  test("Should throw if product not found", async () => {
    const productService = new MockedProductService([]);
    await expect(() =>
      deleteProduct({ productService }, { id: "1" })
    ).rejects.toThrow("Product not found");
  });
});
