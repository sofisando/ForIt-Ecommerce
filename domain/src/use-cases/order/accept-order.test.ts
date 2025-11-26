import { describe, test, expect } from "vitest";
import { MockedOrderService } from "../../services/mocks/mock-order-service.js";
import { MockedProductService } from "../../services/mocks/mock-product-service.js";
import { MockedVariantService } from "../../services/mocks/mock-variant-service.js";
import { productMock } from "../../entities/mocks/product-mock.js";
import { variantMock } from "../../entities/mocks/variant-mock.js";
import { acceptOrder } from "./accept-order.js";
import { MockedStockService } from "../../services/mocks/mock-stock-service.js";
import { stockMock } from "../../entities/mocks/stock-mock.js";
import { orderMock } from "../../entities/mocks/order-mock.js";

describe("acceptOrder", () => {
  const orderService = new MockedOrderService([
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
  ]);

  test("should return error when product not found", async () => {
    const productService = new MockedProductService([]);

    const result = await acceptOrder(
      { orderService, productService, variantService, stockService },
      { orderId: "order-1" }
    );

    expect(result).toStrictEqual(Error("Product p1 not found"));
  });

  test("should return error when variant not found", async () => {
    const variantService = new MockedVariantService([]);
    const result = await acceptOrder(
      { orderService, productService, variantService, stockService },
      { orderId: "order-1" }
    );

    expect(result).toStrictEqual(Error("Variant Variant-1 not found"));
  });

  test("should return error when stock variant not found", async () => {
    const stockService = new MockedStockService([]);
    const result = await acceptOrder(
      { orderService, productService, variantService, stockService },
      { orderId: "order-1" }
    );

    expect(result).toStrictEqual(Error("Stock not found for variant: Madera"));
  }),
    test("should return error when stock is insufficient", async () => {
      const stockService = new MockedStockService([
        stockMock({
          variantId: "Variant-1",
          branchId: "branch-1",
          quantity: 1, //necesitamos 2
        }),
      ]);
      const result = await acceptOrder(
        { orderService, productService, variantService, stockService },
        { orderId: "order-1" }
      );

      expect(result).toStrictEqual(
        Error("Not enough stock for variant: Madera")
      );
    }),
    test("should verify products and variant, and change state order to 'ACCEPTED'", async () => {
      const result = await acceptOrder(
        { orderService, productService, variantService, stockService },
        { orderId: "order-1" }
      );

      if (result instanceof Error) throw result;

      expect(result.state).toBe("accepted");
    });

  test("should return error when order not found", async () => {
    const orderService = new MockedOrderService([]);
    const result = await acceptOrder(
      { orderService, productService, variantService, stockService },
      { orderId: "order-1" }
    );

    expect(result).toStrictEqual(Error("Order not found"));
  });
});
