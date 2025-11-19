import { describe, expect, test } from "vitest";
import { MockedCartService } from "../../services/mocks/mock-cart-service";
import { MockedUserService } from "../../services/mocks/mock-user-service";
import { userMock } from "../../entities/mocks/user-mock";
import { addProductToCart } from "./add-product-to-cart";
import { MockedProductService } from "../../services/mocks/mock-product-service";
import { productMock } from "../../entities/mocks/product-mock";

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
      products: [
        {
          productId: "productId1",
          name: "Mouse",
          categoryId: "category2",
          price: 900,
          variantId: "variantId1",
          discountApplied: undefined,
          quantity: 4,
          subtotal: 0,
        },
      ],
      total: 0,
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
      products: [
        {
          productId: "productId1",
          name: "Mouse",
          categoryId: "category2",
          price: 900,
          variantId: "variantId1",
          discountApplied: undefined,
          quantity: 6,
          subtotal: 0,
        },
      ],
      total: 0,
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
      products: [
        {
          productId: "productId1",
          name: "Mouse",
          categoryId: "category2",
          price: 900,
          variantId: "variantId1",
          discountApplied: undefined,
          quantity: 6,
          subtotal: 0,
        },
        {
          productId: "productId2",
          name: "Phone",
          categoryId: "category5",
          price: 84000,
          variantId: "variantId2",
          discountApplied: undefined,
          quantity: 1,
          subtotal: 0,
        },
      ],
      total: 0,
    });
    expect(result).toStrictEqual(cartService.carts[0]);
  });
});
