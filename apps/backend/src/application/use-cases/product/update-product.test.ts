import {
  Money,
  productMock,
  ProductNotFoundError,
  UnauthorizedError,
  UserRole,
} from "@forit/domain";
import { MockedProductRepository } from "@infra/repos/mocks/index.js";
import { describe, expect, test } from "vitest";
import { updateProduct } from "./update-product.js";

describe("editProduct", async () => {
  const productRepository = new MockedProductRepository([
    productMock({
      id: "1",
      name: "Laptop",
      description: "A powerful laptop",
      price: new Money(1200),
      imageUrl: "http://example.com/laptop.jpg",
      categoryId: "cat1",
    }),
  ]);
  test("When edit a product you should update info product", async () => {
    const result = await updateProduct(
      { productRepository },
      {
        actor: { userId: "user-1", role: UserRole.ADMIN },
        id: "1",
        dto: { name: "Mouse", price: 1600 },
      },
    );
    expect(result.name).toBe("Mouse");
    expect(result.description).toBe("A powerful laptop");
    expect(result.imageUrl).toBe("http://example.com/laptop.jpg");
    expect(result.categoryId).toBe("cat1");
    expect(result.price.amount).toBe(1600);
    expect(productRepository.products).toHaveLength(1);
  });

  test("Should return error if product not found", async () => {
    await expect(
      updateProduct(
        { productRepository },
        {
          actor: { userId: "user-1", role: UserRole.ADMIN },
          id: "999",
          dto: { name: "Mouse", price: 1600 },
        },
      ),
    ).rejects.toThrow(ProductNotFoundError);
  });

  test("Should return error if user is not ADMIN", async () => {
   await expect(
      updateProduct(
        { productRepository },
        {
          actor: { userId: "user-1", role: UserRole.CLIENT },
          id: "1",
          dto: { name: "Mouse", price: 1600 },
        },
      ),
    ).rejects.toThrow(UnauthorizedError);
  });
});
