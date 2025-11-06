import { describe, test, expect } from "vitest";
import { MockedOrderService } from "../../services/mocks/mock-order-service.js";
import { MockedProductService } from "../../services/mocks/mock-product-service.js";
import { cartMock } from "../../entities/mocks/cart-mock.js";
import { productMock } from "../../entities/mocks/product-mock.js";
import { createOrder } from "./create-order.js";

describe("createOrder", () => {
  test("should create an order from a cart snapshot", async () => {
    const productService = new MockedProductService([
      productMock({ id: "p1", name: "Laptop", price: 1000 }),
    ]);
    const orderService = new MockedOrderService([]);

    const cart = cartMock({
      userId: "u1",
      products: [
        {
          productId: "p1",
          quantity: 2,
          subtotal: 2000,
        },
      ],
      total: 2000,
    });

    const result = await createOrder(
      { orderService, productService },
      { cart }
    );

    expect(result.products).toHaveLength(1);
    expect(result.products[0]).toMatchObject({
      productId: "p1",
      name: "Laptop",
      price: 1000,
      quantity: 2,
      subtotal: 2000,
    });
    expect(result.state).toBe("pending");
    expect(orderService.orders).toContainEqual(result);
  });
});
