import { describe, expect, test } from "vitest";
import { MockedProductService } from "../../services/mocks/mock-product-service";
import { productMock } from "../../entities/mocks/product-mock";
import { editProduct } from "./edit-product";

describe("editProduct", async () => {
  const productService = new MockedProductService([
    productMock({
      id: "1",
      name: "Laptop",
      price: 1200,
      description: "A powerful laptop",
      categoryId: "cat1",
      imageUrl: "http://example.com/laptop.jpg",
      variants: [],
    }),
  ]);

  test("When edit a product you should update info product", async () => {
    const result = await editProduct(
      { productService },
      { id: "1", name: "Mouse", price: 1600 }
    );

    expect(result).toStrictEqual({
      id: "1",
      name: "Mouse",
      price: 1600,
      description: "A powerful laptop",
      categoryId: "cat1",
      imageUrl: "http://example.com/laptop.jpg",
      variants: [],
    });
  });

  test("Should throw if product not found", async () => {
    await expect(
      editProduct({ productService }, { id: "999" })
    ).rejects.toThrow("Product not found");
  });
});
