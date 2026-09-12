import { describe, test, expect } from "vitest";
import { cartMock } from "@forit/domain/src/entities/mocks/cart-mock.js";
import { discountMock } from "@forit/domain/src/entities/mocks/discount-mock.js";
import { DiscountType } from "@forit/domain/src/entities/discount.js";
import { MockedCartService } from "../../../../apps/backend/src/application/mocks/mock-cart-repo";
import { MockedDiscountService } from "../../../../apps/backend/src/application/mocks/mock-discount-repo";
import { getCartByUserId } from "@forit/domain/src/use-cases/cart/get-cart-by-user.js";

describe("getCartByUserId", () => {
  test("Return cart by UserId", async () => {
    const cartService = new MockedCartService([cartMock({
      userId: "user-1",
      items: [
        {
          productId: "1",
          quantity: 2
        },
      ]
    })
]);

    const result = await getCartByUserId(
      { cartService },
      { userId: "user-1" }
    );

    expect(result).not.toBeNull();
    expect(result).length(1);
  });

  test("devuelve null si el usuario no tiene carrito", async () => {
    const cartService = new MockedCartService([]);

    const result = await getCartByUserId(
      { cartService },
      { userId: "no-existe" }
    );

    expect(result).toBeNull();
  });
});
