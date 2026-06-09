import { UnauthorizedError, UserRole } from "@forit/domain";
import { describe, expect, test } from "vitest";
import { createProduct } from "./create-product.js";
import { MockedProductRepository } from "@infra/repos/mocks/mock-product-repo.js";

describe("createProduct", async () => {
  //acá no se testea el funcionamiento lo que trae el token o si? o como sería?
  test("should create a new product", async () => {
    const productRepository = new MockedProductRepository([]);
    const result = await createProduct(
      { productRepository },
      {
        actor: { userId: "user-1", role: UserRole.ADMIN },
        dto: {
          name: "Laptop",
          description: "new product",
          imageUrl: "http://example.com/other-product.jpg",
          price: 8000.2,
          categoryId: "2",
        },
      },
    );

    expect(productRepository.products).toHaveLength(1);

    expect(result).toBe(productRepository.products[0]);

    expect(result.name).toBe("Laptop");
    expect(result.description).toBe("new product");
    expect(result.imageUrl).toBe("http://example.com/other-product.jpg");
    expect(result.categoryId).toBe("2");
    expect(result.price.amount).toBe(8000.2);
  });

  test("Should return unauthorized if user is not ADMIN", async () => {
    const productRepository = new MockedProductRepository([]);
    await expect(
      createProduct(
        { productRepository },
        {
          actor: { userId: "user-2", role: UserRole.CLIENT },
          dto: {
            description: "new product",
            imageUrl: "http://example.com/other-product.jpg",
            name: "Laptop",
            price: 8000.0,
            categoryId: crypto.randomUUID(),
          },
        },
      ),
    ).rejects.toThrow(UnauthorizedError);
  });
});
