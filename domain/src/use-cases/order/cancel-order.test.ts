import { describe, test, expect } from "vitest";
import { MockedOrderService } from "../../services/mocks/mock-order-service.js";
import { MockedProductService } from "../../services/mocks/mock-product-service.js";
import { MockedVariantService } from "../../services/mocks/mock-variant-service.js";
import { productMock } from "../../entities/mocks/product-mock.js";
import { variantMock } from "../../entities/mocks/variant-mock.js";
import { MockedStockService } from "../../services/mocks/mock-stock-service.js";
import { stockMock } from "../../entities/mocks/stock-mock.js";
import { orderMock } from "../../entities/mocks/order-mock.js";
import { cancelOrder } from "./cancel-order.js";
import { MockedEmailService } from "../../services/mocks/mock-email-service.js";
import { MockedUserService } from "../../services/mocks/mock-user-service.js";
import { userMock } from "../../entities/mocks/user-mock.js";

describe("cancelOrder", () => {
  const orderService = new MockedOrderService([
    // Caso con variante
    orderMock({
      id: "order-1",
      state: "pending",
      products: [
        {
          productId: "p1",
          name: "Laptop",
          price: 1000,
          quantity: 2,
          subtotal: 2000,
          variant: {
            id: "Variant-1",
            attribute: { title: "Material", value: null, name: "Madera" },
          },
          discountApplied: undefined,
        },
      ],
      branchId: "branch-1",
    }),

    // Estado no válido
    orderMock({
      id: "order-2",
      state: "canceled",
      products: [],
      branchId: "branch-2",
    }),

    // Caso sin variante → usa productId
    orderMock({
      id: "order-3",
      state: "pending",
      products: [
        {
          productId: "p1",
          name: "Laptop",
          price: 1000,
          quantity: 2,
          subtotal: 2000,
          variant: undefined,
          discountApplied: undefined,
        },
      ],
      branchId: "branch-2",
    }),

    
  ]);

  const variantService = new MockedVariantService([
    variantMock({
      id: "Variant-1",
      attribute: { title: "Material", value: null, name: "Madera" },
      productId: "p1",
    }),
  ]);

  const productService = new MockedProductService([
    productMock({ id: "p1", name: "Laptop", price: 1000 }),
  ]);

  const stockService = new MockedStockService([
    stockMock({
      variantId: "Variant-1",
      branchId: "branch-1",
      quantity: 10,
    }),
    // stock por product (para el caso sin variante)
    stockMock({
      productId: "p1",
      branchId: "branch-2",
      quantity: 10,
    }),
  ]);

  const emailService = new MockedEmailService();
  const userService = new MockedUserService([userMock({ id: "user-1", email: "prueba@gmail.com"})]);

  // -------------------------
  // TESTS
  // -------------------------

  test("if state order is 'canceled' return error", async () => {
    const result = await cancelOrder(
      { orderService, productService, variantService, stockService, emailService, userService },
      { orderId: "order-2" , userId: "user-1"}
    );

    expect(result).toStrictEqual(Error("Order is already canceled"));
  });

  test("should return error when product not found", async () => {
    const productService = new MockedProductService([]);

    const result = await cancelOrder(
      { orderService, productService, variantService, stockService, emailService, userService },
      { orderId: "order-1" , userId: "user-1"}
    );

    expect(result).toStrictEqual(Error("Product p1 not found"));
  });

  test("should return error when variant not found", async () => {
    const variantService = new MockedVariantService([]);

    const result = await cancelOrder(
      { orderService, productService, variantService, stockService, emailService, userService },
      { orderId: "order-1" , userId: "user-1"}
    );

    expect(result).toStrictEqual(Error("Variant Variant-1 not found"));
  });

  test("should return error when stock variant not found", async () => {
    const stockService = new MockedStockService([]);

    const result = await cancelOrder(
      { orderService, productService, variantService, stockService, emailService, userService },
      { orderId: "order-1" , userId: "user-1"}
    );

    expect(result).toStrictEqual(Error("Stock not found for variant: Madera"));
  });

  test("should return error when stock product not found", async () => {
    const stockService = new MockedStockService([]);

    const result = await cancelOrder(
      { orderService, productService, variantService, stockService, emailService, userService },
      { orderId: "order-3" , userId: "user-1"}
    );

    expect(result).toStrictEqual(Error("Stock not found for product: Laptop"));
  });

  test("success case with variant → should increase products, change state to CANCELED and notify", async () => {
    const result = await cancelOrder(
      { orderService, productService, variantService, stockService, emailService, userService },
      { orderId: "order-1" , userId: "user-1"}
    );

    if (result instanceof Error) throw result;

    expect(result.state).toBe("canceled");
    expect(emailService.sent.length).toBe(1);
    expect(emailService.sent[0]).toMatchObject({
      to: "prueba@gmail.com",
      subject: "Orden cancelada",
    });
  });

  test("success case without variant (uses product stock) → should increase products, change state to CANCELED and notify", async () => {
    const result = await cancelOrder(
      { orderService, productService, variantService, stockService, emailService, userService },
      { orderId: "order-3" , userId: "user-1"}
    );

    if (result instanceof Error) throw result;

    expect(result.state).toBe("canceled");
    expect(emailService.sent.length).toBe(2);
    expect(emailService.sent[0]).toMatchObject({
      to: "prueba@gmail.com",
      subject: "Orden cancelada",
    });
  });

  test("should return error when order not found", async () => {
    const orderService = new MockedOrderService([]);

    const result = await cancelOrder(
      { orderService, productService, variantService, stockService, emailService, userService },
      { orderId: "order-1" , userId: "user-1"}
    );

    expect(result).toStrictEqual(Error("Order not found"));
  });
});
