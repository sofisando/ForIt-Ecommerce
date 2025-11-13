import { describe, expect, test } from "vitest";
import { MockedCartService } from "../../services/mocks/mock-cart-service";
import { cartMock } from "../../entities/mocks/cart-mock";
import { updateProductQuantity } from "./update-product-quantity";

describe("updateProductQuantity", async () => {
  const cartService = new MockedCartService([
    cartMock({
      userId: "1",
      products: [
        {
          productId: "productId1",
          variantId: "variantId1",
          discountApplied: undefined,
          quantity: 2,
          subtotal: 0,
        },
        {
          productId: "productId2",
          variantId: "variantId2",
          discountApplied: undefined,
          quantity: 3,
          subtotal: 0,
        },
      ],
      total: 0,
    }),
  ]);

  test("Should update quantity product from list products in cart", async () => {
    const result = await updateProductQuantity(
      { cartService },
      {
        userId: "1",
        productId: "productId2",
        variantId: "variantId2",
        quantity: 7,
      }
    );

    expect(cartService.carts).toHaveLength(1);
    expect(cartService.carts[0]).toStrictEqual({
      id: expect.any(String),
      userId: "1",
      products: [
        {
          productId: "productId1",
          variantId: "variantId1",
          discountApplied: undefined,
          quantity: 2,
          subtotal: 0,
        },
        {
          productId: "productId2",
          variantId: "variantId2",
          discountApplied: undefined,
          quantity: 7,
          subtotal: 0,
        },
      ],
      total: 0,
    });
    expect(result).toStrictEqual(cartService.carts[0]);
  });

  test("if cart not found should return an error.", async () => {
    await expect(() =>
      updateProductQuantity(
        { cartService },
        {
          userId: "999",
          productId: "productId1",
          variantId: "variantId1",
          quantity: 9,
        }
      )
    ).rejects.toThrow("Cart not found");
  });

  test("if product not found should return an error.", async () => {
    await expect(() =>
      updateProductQuantity(
        { cartService },
        {
          userId: "1",
          productId: "productId99",
          variantId: "variantId99",
          quantity: 9,
        }
      )
    ).rejects.toThrow("Product not in cart");
  });
});
