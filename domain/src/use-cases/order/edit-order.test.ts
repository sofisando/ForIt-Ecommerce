import { describe, expect, test } from "vitest";
import { MockedOrderService } from "../../services/mocks/mock-order-service";
import { orderMock } from "../../entities/mocks/order-mock";
import { editOrder } from "./edit-order";
import { MockedUserService } from "../../services/mocks/mock-user-service";
import { userMock } from "../../entities/mocks/user-mock";

describe("editOrder", async () => {
  const orderService = new MockedOrderService([
    orderMock({
      id: "order-1",
      date: new Date("2023-01-01"),
    }),
  ]);
  const userService = new MockedUserService([
    userMock({ id: "user-1", role: "ADMIN" }),
    userMock({ id: "user-2", role: "CLIENT" }),
  ]);

  test("When edit a order you should update info order", async () => {
    const result = await editOrder(
      { orderService, userService },
      { id: "order-1", userId: "user-1", date: new Date("2025-01-02") }
    );

    if (result instanceof Error) throw result;
    expect(result.date).toStrictEqual(new Date("2025-01-02"));
  });

  test("Should return error if order not found", async () => {
    const result = await editOrder(
      { orderService, userService },
      { id: "order-999", userId: "user-1", date: new Date("2025-01-02") }
    );
    expect(result).toStrictEqual(Error("Order not found"));
  });

  test("Should return error if user not found", async () => {
    const result = await editOrder(
      { orderService, userService },
      { id: "order-1", userId: "user-999", date: new Date("2025-01-02") }
    );
    expect(result).toStrictEqual(Error("User user-999 not found"));
  });

  test("Should return error if user is not ADMIN", async () => {
    const result = await editOrder(
      { orderService, userService },
      { id: "order-1", userId: "user-2", date: new Date("2025-01-02") }
    );
    expect(result).toStrictEqual(Error("User is not ADMIN"));
  });
});
