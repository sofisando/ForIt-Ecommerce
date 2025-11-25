import { describe, test, expect } from "vitest";
import { MockedOrderService } from "../../services/mocks/mock-order-service";
import { orderMock } from "../../entities/mocks/order-mock";
import { deleteOrder } from "./delete-order";

describe("deleteOrder", async () => {
  test("Should delete order", async () => {
    const orderService = new MockedOrderService([
      orderMock({ id: "1" }),
      orderMock({ id: "2" }),
    ]);
    const result = await deleteOrder({ orderService }, { id: "1" });
    expect(result).toBeUndefined();

    const orders = await orderService.findAll();
    expect(orders).toHaveLength(1);
  });
  test("Should throw if order not found", async () => {
    const orderService = new MockedOrderService([]);
    await expect(() =>
      deleteOrder({ orderService }, { id: "1" })
    ).rejects.toThrow("Order not found");
  });
});
