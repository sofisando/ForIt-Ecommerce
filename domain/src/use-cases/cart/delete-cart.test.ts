import { describe, test, expect } from "vitest";
import { MockedCartService } from "../../services/mocks/mock-cart-service";
import { cartMock } from "../../entities/mocks/cart-mock";
import { deleteCart } from "./delete-cart";

describe("deleteCart", async () => {
  test("Should delete cart", async () => {
    const cartService = new MockedCartService([
      cartMock({ id: "1" }),
      cartMock({ id: "2" }),
    ]);
    const result = await deleteCart({ cartService }, { id: "1" });
    expect(result).toBeUndefined();

    const carts = await cartService.findAll();
    expect(carts).toHaveLength(1);
  });
  test("Should throw if cart not found", async () => {
    const cartService = new MockedCartService([]);
    await expect(() =>
      deleteCart({ cartService }, { id: "1" })
    ).rejects.toThrow("Cart not found");
  });
});
