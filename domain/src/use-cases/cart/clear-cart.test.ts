import { describe, test, expect } from "vitest";
import { MockedCartService } from "../../services/mocks/mock-cart-service";
import { cartMock } from "../../entities/mocks/cart-mock";
import { clearCart } from "./clear-cart";

describe("clearCart", async () => {
  const cartService = new MockedCartService([
    cartMock({ userId: "1" }),
    cartMock({ userId: "2" }),
  ]);
  test("Should clear cart", async () => {
    const result = await clearCart({ cartService }, { userId: "1" });
    expect(result).toStrictEqual({
      id: expect.any(String),
      userId: "1",
      products: [],
      total: 0,
    });

    const carts = await cartService.findAll();
    expect(carts).toHaveLength(2);
    expect(carts[0]).toStrictEqual({
      id: expect.any(String),
      userId: "1",
      products: [],
      total: 0,
    });
  });
  test("Should throw if cart not found", async () => {
    const result = await clearCart({ cartService }, { userId: "999" });
    expect(result).toStrictEqual(Error("Cart not found"));
  });
});
