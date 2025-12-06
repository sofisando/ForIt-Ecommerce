import { describe, test, expect } from "vitest";
import { MockedOrderService } from "../../services/mocks/mock-order-service.js";
import { MockedProductService } from "../../services/mocks/mock-product-service.js";
import { MockedVariantService } from "../../services/mocks/mock-variant-service.js";

import { cartMock } from "../../entities/mocks/cart-mock.js";
import { productMock } from "../../entities/mocks/product-mock.js";

import { createOrder } from "./create-order.js";
import { variantMock } from "../../entities/mocks/variant-mock.js";
import { MockedUserService } from "../../services/mocks/mock-user-service.js";
import { userMock } from "../../entities/mocks/user-mock.js";
import { MockedEmailService } from "../../services/mocks/mock-email-service.js";

describe("createOrder", () => {
  const orderService = new MockedOrderService([]);
  const variantService = new MockedVariantService([
    variantMock({ id: "Variant-1" }),
  ]);
  const productService = new MockedProductService([
    productMock({ id: "p1", name: "Laptop", price: 1000 }),
  ]);
  const userService = new MockedUserService([
    userMock({ id: "u1", email: "prueba@gmail.com" }),
  ]);
  const emailService = new MockedEmailService();
  test("should create an order from a cart snapshot", async () => {
    const cart = cartMock({
      userId: "u1",
      products: [
        {
          productId: "p1",
          categoryId: "category-1",
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
      {
        orderService,
        productService,
        variantService,
        emailService,
        userService,
      },
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
    expect(emailService.sent.length).toBe(1);
    expect(emailService.sent[0]).toMatchObject({
      to: "prueba@gmail.com",
      subject: "Gracias por tu compra",
    });
  });

  test("should return error when product not found", async () => {
    const productService = new MockedProductService([]);

    const cart = cartMock({
      userId: "u1",
      products: [
        {
          productId: "p1",
          categoryId: "category-1",
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
      {
        orderService,
        productService,
        variantService,
        emailService,
        userService,
      },
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
          categoryId: "category-1",
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
      {
        orderService,
        productService,
        variantService,
        emailService,
        userService,
      },
      payload
    );

    expect(result).toStrictEqual(Error("Variant Variant-2 not found"));
  });
});
