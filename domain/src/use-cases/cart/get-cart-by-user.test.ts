import { describe, test, expect } from "vitest";
import { cartMock } from "../../entities/mocks/cart-mock";
import { discountMock } from "../../entities/mocks/discount-mock";
import { DiscountType } from "../../entities/discount";
import { MockedCartService } from "../../services/mocks/mock-cart-service";
import { MockedDiscountService } from "../../services/mocks/mock-discount-service";
import { getCartByUserId } from "./get-cart-by-user";

describe("getCartByUserId", () => {
  test("Return the shopping cart enriched with discounts, subtotals, and total", async () => {
    // 1) Preparamos un descuento ACTIVO que aplica a un producto concreto
    const productId = crypto.randomUUID();

    const discount = discountMock({
      active: true,
      type: DiscountType.PERCENTAGE,
      value: 10,
      productsApplied: [productId], // Aplica al producto
    });

    // 2) Preparamos carrito con un solo producto
    const cart = cartMock({
      userId: "user-1",
      products: [
        {
          productId,
          name: "Test product",
          price: 100,
          quantity: 2,
          categoryId: "cat1",
          variantId: undefined,
          discountApplied: undefined, // se debe llenar luego
          subtotal: 0,
        },
      ],
      total: 0,
    });

    const cartService = new MockedCartService([cart]);
    const discountService = new MockedDiscountService([discount]);

    // 3) Ejecutamos el caso de uso
    const result = await getCartByUserId(
      { cartService, discountService },
      { userId: "user-1" }
    );

    expect(result).not.toBeNull();

    // 4) Verificamos que tenga el descuento aplicado
    expect(result!.products[0]!.discountApplied).toEqual({
      id: discount.id,
      name: discount.name,
      type: discount.type,
      value: discount.value,
    });

    // 5) Verificamos subtotal → precio con 10% de descuento = 90 * 2 = 180
    expect(result!.products[0]!.subtotal).toBe(180);

    // 6) Verificamos total
    expect(result!.total).toBe(180);
  });

  test("devuelve null si el usuario no tiene carrito", async () => {
    const cartService = new MockedCartService([]);
    const discountService = new MockedDiscountService([]);

    const result = await getCartByUserId(
      { cartService, discountService },
      { userId: "no-existe" }
    );

    expect(result).toBeNull();
  });
});
