import { describe, expect, test } from "vitest";
import { MockedCartService } from "../../../../apps/backend/src/application/mocks/mock-cart-repo";
import { cartMock } from "@forit/domain/src/entities/mocks/cart-mock.js";
import { updateProductQuantity } from "@forit/domain/src/use-cases/cart/update-product-quantity.js";

describe("updateProductQuantity", async () => {
  const cartService = new MockedCartService([
    cartMock({
      userId: "1",
      items: [
        {
          productId: "productId1",
          variantId: "variantId1",
          quantity: 2
        },
        {
          productId: "productId2",
          variantId: "variantId2",
          quantity: 3
        },
      ]
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
      items: [
        {
          productId: "productId1",
          variantId: "variantId1",
          quantity: 2
        },
        {
          productId: "productId2",
          variantId: "variantId2",
          quantity: 7
        },
      ]
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
