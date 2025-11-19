import { describe, test, expect } from "vitest";
import { calculateCartTotal } from "./calculateCartTotals";
import { cartMock } from "../../entities/mocks/cart-mock";

describe("calculateCartTotal", () => {
  
  test("sum of subtotals of all products", () => {
    const cart = cartMock({
      products: [
        { productId: "p1", subtotal: 100 } as any,
        { productId: "p2", subtotal: 300 } as any,
      ],
    });

    const result = calculateCartTotal(cart);

    expect(result.total).toBe(400);
  });

  test("total = 0 when there are no products", () => {
    const cart = cartMock({ products: [] });

    const result = calculateCartTotal(cart);

    expect(result.total).toBe(0);
  });
});
