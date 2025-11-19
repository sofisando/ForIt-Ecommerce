import { describe, test, expect } from "vitest";
import { calculateCartSubtotal } from "./calculateCartSubtotals";
import { cartMock } from "../../entities/mocks/cart-mock";
import { DiscountType } from "../../entities/discount";

describe("calculateCartSubtotal", () => {
  test("Calculate subtotal without discount", () => {
    const cart = cartMock({
      products: [
        {
          productId: "p1",
          name: "Prod",
          price: 100,
          categoryId: "c1",
          quantity: 2,
          variantId: undefined,
          discountApplied: undefined,
          subtotal: 0,
        },
      ],
    });

    const result = calculateCartSubtotal(cart);

    expect(result.products[0]!.subtotal).toBe(200); // 100 * 2
  });

  test("Calculate subtotal with percentage discount", () => {
    const cart = cartMock({
      products: [
        {
          productId: "p1",
          name: "Prod",
          price: 100,
          categoryId: "c1",
          quantity: 2,
          variantId: undefined,
          discountApplied: {
            id: "d1",
            name: "10% off",
            type: DiscountType.PERCENTAGE,
            value: 10,
          },
          subtotal: 0,
        },
      ],
    });

    const result = calculateCartSubtotal(cart);

    expect(result.products[0]!.subtotal).toBe(180); // (100 - 10%) = 90 → 90*2
  });

  test("Calculate subtotal with fixed discount", () => {
    const cart = cartMock({
      products: [
        {
          productId: "p1",
          name: "Prod",
          price: 100,
          categoryId: "c1",
          quantity: 3,
          variantId: undefined,
          discountApplied: {
            id: "d1",
            name: "20 off",
            type: DiscountType.FIXED_AMOUNT,
            value: 20,
          },
          subtotal: 0,
        },
      ],
    });

    const result = calculateCartSubtotal(cart);

    expect(result.products[0]!.subtotal).toBe(240); // (100 - 20)=80 → 80*3
  });

  test("never allows negative subtotal", () => {
    const cart = cartMock({
      products: [
        {
          productId: "p1",
          name: "Prod",
          price: 10,
          categoryId: "c1",
          quantity: 2,
          variantId: undefined,
          discountApplied: {
            id: "d1",
            name: "50 off",
            type: DiscountType.FIXED_AMOUNT,
            value: 50, // mayor que el precio
          },
          subtotal: 0,
        },
      ],
    });

    const result = calculateCartSubtotal(cart);

    expect(result.products[0]!.subtotal).toBe(0); // precio→0 → subtotal=0
  });
});
