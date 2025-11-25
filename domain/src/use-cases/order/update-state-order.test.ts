import { describe, expect, test } from "vitest";
import { MockedOrderService } from "../../services/mocks/mock-order-service";
import { orderMock } from "../../entities/mocks/order-mock";
import { updateStateOrder } from "./update-state-order";
import { Order } from "../../entities";

describe("updateStateOrder", async () => {
  const orderService = new MockedOrderService([
    orderMock({
      id: "order-1",
      state: "pending",
    }),
  ]);

  test("When change state in order you should update state in order", async () => {
    const result = (await updateStateOrder(
      { orderService },
      { id: "order-1", state: "accepted" }
    )) as Order;

    expect(result.state).toStrictEqual("accepted");
  });

  test("Should return error if order not found", async () => {
    const result = await updateStateOrder(
      { orderService },
      { id: "order-999", state: "accepted" }
    );
    expect(result).toStrictEqual(Error("Order not found"));
  });
});
