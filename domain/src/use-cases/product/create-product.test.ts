import { describe, expect, test } from "vitest";
import { MockedProductService } from "../../services/mocks/mock-product-service";
import { productMock } from "../../entities/mocks/product-mock";
import { createProduct } from "./create-product";
import { MockedUserService } from "../../services/mocks/mock-user-service";
import { userMock } from "../../entities/mocks/user-mock";

describe("createProduct", async () => {
  const productService = new MockedProductService([
    productMock({
      id: crypto.randomUUID(),
      categoryId: crypto.randomUUID(),
      description: "Existing product",
      imageUrl: "http://example.com/existing-product.jpg",
      name: "Mouse",
      price: 49.99,
    }),
  ]);
  const userService = new MockedUserService([
    userMock({ id: "user-1", role: "ADMIN" }),
    userMock({ id: "user-2", role: "CLIENT" }),
  ]);

  test("should create a new product", async () => {
    const result = await createProduct(
      { productService, userService },
      {
        userId: "user-1",
        data: {
          categoryId: crypto.randomUUID(),
          description: "new product",
          imageUrl: "http://example.com/other-product.jpg",
          name: "Laptop",
          price: 8000.0,
        },
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
    });
    expect(result).toStrictEqual(productService.products[1]);
  });

  test("should return error when user not found", async () => {
    const result = await createProduct(
      { productService, userService },
      {
        userId: "user-999",
        data: {
          categoryId: crypto.randomUUID(),
          description: "new product",
          imageUrl: "http://example.com/other-product.jpg",
          name: "Laptop",
          price: 8000.0,
        },
      }
    );

    expect(result).toStrictEqual(Error("User user-999 not found"))
  });

  test("Should return error if user is not ADMIN", async () => {
     const result = await createProduct(
      { productService, userService },
      {
        userId: "user-2",
        data: {
          categoryId: crypto.randomUUID(),
          description: "new product",
          imageUrl: "http://example.com/other-product.jpg",
          name: "Laptop",
          price: 8000.0,
        },
      }
    );
      expect(result).toStrictEqual(Error("User is not ADMIN"))
    });
});
