import { productMock, ProductNotFoundError, UnauthorizedError, UserRole } from "@forit/domain";
import { MockedProductRepository } from "@infra/repos/mocks/index.js";
import { describe, test, expect } from "vitest";
import { deleteProduct } from "./delete-product.js";

describe("deleteProduct", async () => {
  const productRepository = new MockedProductRepository([
    productMock({ id: "1" }),
    productMock({ id: "2" }),
  ]);

  test("Should delete product", async () => {
    const result = await deleteProduct(
      { productRepository },
      { actor: { userId: "user-1", role: UserRole.ADMIN }, dto: { id: "1" } },
    );
    expect(result).toBeUndefined();

    const products = await productRepository.getAll();
    expect(products).toHaveLength(1);
  });

  test("Should return error if product not found", async () => {
    await expect(
      deleteProduct(
        { productRepository },
        {
          actor: { userId: "user-1", role: UserRole.ADMIN },
          dto: { id: "999" },
        },
      ),
    ).rejects.toThrow(ProductNotFoundError);
  });


  test("Should return error if user is not ADMIN", async () => {
    await expect(
      deleteProduct(
        { productRepository },
        {
          actor: { userId: "user-2", role: UserRole.CLIENT },
          dto: { id: "1" },
        },
      ),
    ).rejects.toThrow(UnauthorizedError);
  });
});
