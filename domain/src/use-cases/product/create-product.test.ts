import { describe, expect, test } from "vitest";
import { MockedProductService } from "../../services/mocks/mock-product-service";
import { productMock } from "../../entities/mocks/product-mock";
import { createProduct } from "./create-product";
import { Variant } from "../../entities/variant";

describe("createProduct", async () => {
  const productService = new MockedProductService([
    productMock({
      id: crypto.randomUUID(),
      categoryId: crypto.randomUUID(),
      description: "Existing product",
      imageUrl: "http://example.com/existing-product.jpg",
      name: "Mouse",
      price: 49.99,
      variants: [],
    }),
  ]);

  test("should create a new product", async () => {
    const result = await createProduct(
      { productService },
      {
        categoryId: crypto.randomUUID(),
        description: "new product",
        imageUrl: "http://example.com/other-product.jpg",
        name: "Laptop",
        price: 8000.0,
        variants: [],
      }
    );

    expect(productService.products).toHaveLength(2);
    expect(productService.products[1]).toStrictEqual({
      id: expect.any(String),
      categoryId: expect.any(String),
      description: "new product",
      imageUrl: "http://example.com/other-product.jpg",
      name: "Laptop",
      price: 8000.0,
      variants: [],
    });
    expect(result).toStrictEqual(productService.products[1]);
  });

  test("should create a new product with variants", async () => {
    const categoryId = crypto.randomUUID();
    const variants: Variant[] = [
      { id: crypto.randomUUID(), attribute: "Color: Black" },
      { id: crypto.randomUUID(), attribute: "Size: Large" },
    ];

    const result = await createProduct(
      { productService },
      {
        categoryId,
        description: "product with variants",
        imageUrl: "http://example.com/product-with-variants.jpg",
        name: "Headphones",
        price: 3000.0,
        variants,
      }
    );

    expect(productService.products).toHaveLength(3);
    expect(productService.products[2]).toStrictEqual({
      id: expect.any(String),
      categoryId,
      description: "product with variants",
      imageUrl: "http://example.com/product-with-variants.jpg",
      name: "Headphones",
      price: 3000.0,
      variants,
    });
    expect(result).toStrictEqual(productService.products[2]);
  });
});
