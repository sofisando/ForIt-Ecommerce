import { describe, expect, test } from "vitest";
import { MockedCartService } from "../../services/mocks/mock-cart-service";
import { cartMock } from "../../entities/mocks/cart-mock";
import { removeProductFromCart } from "./remove-product-from-cart";

describe("removeProductFromCart", async () => {
  const cartService = new MockedCartService([
    cartMock({
      userId: "1",
      products: [
        {
          productId: "productId1",
          name: "Laptop",
          price: 1500,
          categoryId: "category1",
          variantId: "variantId1",
          discountApplied: undefined,
          quantity: 2,
          subtotal: 0,
        },
        {
          productId: "productId2",
          name: "Mouse",
          price: 500,
          categoryId: "category2",
          variantId: "variantId2",
          discountApplied: undefined,
          quantity: 3,
          subtotal: 0,
        },
      ],
      total: 0,
    }),
  ]);

  test("Should remove product from list products in cart", async () => {
    const result = await removeProductFromCart(
      { cartService },
      {
        userId: "1",
        productId: "productId2",
        variantId: "variantId2",
      }
    );

    expect(cartService.carts).toHaveLength(1);
    expect(cartService.carts[0]).toStrictEqual({
      id: expect.any(String),
      userId: "1",
      products: [
        {
          productId: "productId1",
          name: "Laptop",
          price: 1500,
          categoryId: "category1",
          variantId: "variantId1",
          discountApplied: undefined,
          quantity: 2,
          subtotal: 0,
        },
      ],
      total: 0,
    });
    expect(result).toStrictEqual(cartService.carts[0]);
  });

  test("if cart not found should return an error.", async () => {
    await expect(() =>
      removeProductFromCart(
        { cartService },
        {
          userId: "999",
          productId: "productId1",
          variantId: "variantId1",
        }
      )
    ).rejects.toThrow("Cart not found");
  });
});
