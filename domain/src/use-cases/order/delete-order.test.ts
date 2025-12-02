import { describe, test, expect } from "vitest";
import { MockedOrderService } from "../../services/mocks/mock-order-service";
import { orderMock } from "../../entities/mocks/order-mock";
import { deleteOrder } from "./delete-order";
import { MockedUserService } from "../../services/mocks/mock-user-service";
import { userMock } from "../../entities/mocks/user-mock";

describe("deleteOrder", async () => {
  const userService = new MockedUserService([
    userMock({ id: "user-1", role: "ADMIN" }),
    userMock({ id: "user-2", role: "CLIENT" }),
  ]);
  const orderService = new MockedOrderService([
    orderMock({ id: "1" }),
    orderMock({ id: "2" }),
  ]);
  test("SUCCESS CASE - Should delete order", async () => {
    const result = await deleteOrder(
      { orderService, userService },
      { id: "1", userId: "user-1" }
    );
    expect(result).toBeUndefined();

    const orders = await orderService.findAll();
    expect(orders).toHaveLength(1);
  });
  test("Should return error if order not found", async () => {
    const orderService = new MockedOrderService([]);
    const result = await deleteOrder(
      { orderService, userService },
      { id: "999", userId: "user-1" }
    );
    expect(result).toStrictEqual(Error("Order not found"));
  });
  test("Should return error if user not found", async () => {
    const result = await deleteOrder(
      { orderService, userService },
      { id: "2", userId: "user-999" }
    );
    expect(result).toStrictEqual(Error("User user-999 not found"));
  });
  test("Should return error if user is not ADMIN", async () => {
    const result = await deleteOrder(
      { orderService, userService },
      { id: "2", userId: "user-2" }
    );
    expect(result).toStrictEqual(Error("User is not ADMIN"));
  });
});
