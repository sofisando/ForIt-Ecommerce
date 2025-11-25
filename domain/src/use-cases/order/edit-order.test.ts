import { describe, expect, test } from "vitest";
import { MockedOrderService } from "../../services/mocks/mock-order-service";
import { orderMock } from "../../entities/mocks/order-mock";
import { editOrder } from "./edit-order";

describe("editOrder", async () => {
  const orderService = new MockedOrderService([
    orderMock({
      id: "order-1",
      date: new Date("2023-01-01"),
    }),
  ]);

  test("When edit a order you should update info order", async () => {
    const result = await editOrder(
      { orderService },
      { id: "order-1", date: new Date("2025-01-02") }
    );

    expect(result.date).toStrictEqual(
      new Date("2025-01-02")
    );
  });

  test("Should throw if order not found", async () => {
    await expect(editOrder({ orderService }, { id: "999" })).rejects.toThrow(
      "Order not found"
    );
  });
});
