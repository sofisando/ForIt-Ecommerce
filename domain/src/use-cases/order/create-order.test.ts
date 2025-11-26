import { describe, test, expect } from "vitest";
import { MockedOrderService } from "../../services/mocks/mock-order-service.js";
import { MockedProductService } from "../../services/mocks/mock-product-service.js";
import { MockedVariantService } from "../../services/mocks/mock-variant-service.js";

import { cartMock } from "../../entities/mocks/cart-mock.js";
import { productMock } from "../../entities/mocks/product-mock.js";

import { createOrder } from "./create-order.js";
import { variantMock } from "../../entities/mocks/variant-mock.js";

describe("createOrder", () => {
  const orderService = new MockedOrderService([]);
  const variantService = new MockedVariantService([
    variantMock({ id: "Variant-1" }),
  ]);
  const productService = new MockedProductService([
    productMock({ id: "p1", name: "Laptop", price: 1000 }),
  ]);
  test("should create an order from a cart snapshot", async () => {
    const cart = cartMock({
      userId: "u1",
      products: [
        {
          productId: "p1",
          name: "Laptop",
          price: 1000,
          discountApplied: undefined,
          variantId: undefined,
          quantity: 2,
          subtotal: 2000,
        },
      ],
      total: 2000,
    });

    // --- Extract the payload (CreatePayload<Cart>) ---
    const payload = {
      userId: cart.userId,
      products: cart.products,
      branchId: null,
      total: cart.total,
    };

    const result = await createOrder(
      { orderService, productService, variantService },
      payload
    );

    if (result instanceof Error) throw result;

    expect(result.products).toHaveLength(1);
    expect(result.products[0]).toMatchObject({
      productId: "p1",
      name: "Laptop",
      price: 1000,
      quantity: 2,
      subtotal: 2000,
      variant: undefined,
      discountApplied: undefined,
    });

    expect(result.state).toBe("pending");
    expect(orderService.orders).toContainEqual(result);
  });

  test("should return error when product not found", async () => {
    const productService = new MockedProductService([]);

    const cart = cartMock({
      userId: "u1",
      products: [
        {
          productId: "p1",
          name: "Laptop",
          price: 1000,
          discountApplied: undefined,
          variantId: undefined,
          quantity: 2,
          subtotal: 2000,
        },
      ],
      total: 2000,
    });

    // --- Extract the payload (CreatePayload<Cart>) ---
    const payload = {
      userId: cart.userId,
      products: cart.products,
      branchId: null,
      total: cart.total,
    };

    const result = await createOrder(
      { orderService, productService, variantService },
      payload
    );

    expect(result).toStrictEqual(Error("Product p1 not found"));
  });

  test("should return error when variant not found", async () => {
    const cart = cartMock({
      userId: "u1",
      products: [
        {
          productId: "p1",
          name: "Laptop",
          price: 1000,
          discountApplied: undefined,
          variantId: "Variant-2",
          quantity: 2,
          subtotal: 2000,
        },
      ],
      total: 2000,
    });

    // --- Extract the payload (CreatePayload<Cart>) ---
    const payload = {
      userId: cart.userId,
      products: cart.products,
      branchId: null,
      total: cart.total,
    };

    const result = await createOrder(
      { orderService, productService, variantService },
      payload
    );

    expect(result).toStrictEqual(Error("Variant Variant-2 not found"));
  });
});
