import { describe, expect, test } from "vitest";
import { MockedCartService } from "../../../../apps/backend/src/application/mocks/mock-cart-repo";
import { MockedUserService } from "../../../../apps/backend/src/application/mocks/mock-user-repo";
import { userMock } from "@forit/domain/src/entities/mocks/user-mock.js";
import { addProductToCart } from "@forit/domain/src/use-cases/cart/add-product-to-cart.js";
import { MockedProductService } from "../../../../apps/backend/src/application/mocks/mock-product-repo";
import { productMock } from "@forit/domain/src/entities/mocks/product-mock.js";

describe("addProductToCart", async () => {
  const cartService = new MockedCartService([]);
  const userService = new MockedUserService([userMock({ id: "1" })]);
  const productService = new MockedProductService([
    productMock({
      id: "productId1",
      name: "Mouse",
      categoryId: "category2",
      price: 900,
    }),
    productMock({
      id: "productId2",
      name: "Phone",
      categoryId: "category5",
      price: 84000,
    }),
  ]);

  test("If not found the cart should create a new, and add product to cart", async () => {
    const result = await addProductToCart(
      { cartService, userService, productService },
      {
        userId: "1",
        productId: "productId1",
        variantId: "variantId1",
        quantity: 4,
      }
    );

    expect(cartService.carts).toHaveLength(1);
    expect(cartService.carts[0]).toStrictEqual({
      id: expect.any(String),
      userId: "1",
      items: [{productId: "productId1", variantId: "variantId1", quantity: 4}]
    });
    expect(result).toStrictEqual(cartService.carts[0]);
  });

  test("Should add the quantity to the product in the cart.", async () => {
    const result = await addProductToCart(
      { cartService, userService, productService },
      {
        userId: "1",
        productId: "productId1",
        variantId: "variantId1",
        quantity: 2,
      }
    );

    expect(cartService.carts).toHaveLength(1);
    expect(cartService.carts[0]).toStrictEqual({
      id: expect.any(String),
      userId: "1",
      items: [
        {
          productId: "productId1",
          variantId: "variantId1",
          quantity: 6
        },
      ]
    });
    expect(result).toStrictEqual(cartService.carts[0]);
  });

  test("Should add a product to list products in cart.", async () => {
    const result = await addProductToCart(
      { cartService, userService, productService },
      {
        userId: "1",
        productId: "productId2",
        variantId: "variantId2",
        quantity: 1,
      }
    );

    expect(cartService.carts).toHaveLength(1);
    expect(cartService.carts[0]).toStrictEqual({
      id: expect.any(String),
      userId: "1",
      items: [
        {
          productId: "productId1",
          variantId: "variantId1",
          quantity: 6
        },
        {
          productId: "productId2",
          variantId: "variantId2",
          quantity: 1
        },
      ]
    });
    expect(result).toStrictEqual(cartService.carts[0]);
  });
});
