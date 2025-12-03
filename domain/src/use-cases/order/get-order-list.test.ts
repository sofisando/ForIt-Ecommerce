import { describe, test, expect } from "vitest";
import { MockedOrderService } from "../../services/mocks/mock-order-service";
import { orderMock } from "../../entities/mocks/order-mock";
import { getOrderList } from "./get-order-list";
import { MockedUserService } from "../../services/mocks/mock-user-service";
import { userMock } from "../../entities/mocks/user-mock";

describe("getOrderList", async () => {
  const userService = new MockedUserService([
    userMock({ id: "user-1", role: "ADMIN" }),
    userMock({ id: "user-2", role: "CLIENT" }),
  ]);
  test("If user is ADMIN should return a array of orders", async () => {
    const orderService = new MockedOrderService([orderMock(), orderMock()]); //acá ejecutamos el constructor del Mock de servicio y le metemos Mocks de usuario
    const result = await getOrderList(
      { orderService, userService },
      { userId: "user-1" }
    );
    expect(result).toHaveLength(2);
    expect(result).toStrictEqual(orderService.orders);
  });
  test("if there are no orders you should return an empty list", async () => {
    const orderService = new MockedOrderService([]);
    const result = await getOrderList(
      { orderService, userService },
      { userId: "user-1" }
    );
    expect(result).toHaveLength(0);
    expect(result).toStrictEqual([]);
  });
  test("Should return error if user not found", async () => {
    const orderService = new MockedOrderService([orderMock(), orderMock()]); //acá ejecutamos el constructor del Mock de servicio y le metemos Mocks de usuario
    const result = await getOrderList(
      { orderService, userService },
      { userId: "user-999" }
    );
    expect(result).toStrictEqual(Error("User user-999 not found"))
  });
  test("Should return error if user is not ADMIN", async () => {
    const orderService = new MockedOrderService([orderMock(), orderMock()]); //acá ejecutamos el constructor del Mock de servicio y le metemos Mocks de usuario
    const result = await getOrderList(
      { orderService, userService },
      { userId: "user-2" }
    );
    expect(result).toStrictEqual(Error("User is not ADMIN"))
  });
});
