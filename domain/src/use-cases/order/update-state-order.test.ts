import { describe, expect, test } from "vitest";
import { MockedOrderService } from "../../services/mocks/mock-order-service";
import { orderMock } from "../../entities/mocks/order-mock";
import { updateStateOrder } from "./update-state-order";
import { Order } from "../../entities";
import { MockedUserService } from "../../services/mocks/mock-user-service";
import { userMock } from "../../entities/mocks/user-mock";
import { MockedEmailService } from "../../services/mocks/mock-email-service";

describe("updateStateOrder", async () => {
  const orderService = new MockedOrderService([
    orderMock({
      id: "order-1",
      state: "pending",
    }),
  ]);
  const userService = new MockedUserService([userMock({ id: "user-1", email: "prueba@gmail.com" ,role: "ADMIN"}),
    userMock({ id: "user-2", role: "CLIENT"})
  ])
  const emailService = new MockedEmailService();

  test("SUCCESS CASE - if user found and is ADMIN, should change state in order", async () => {
    const result = (await updateStateOrder(
      { orderService, userService, emailService },
      { orderId: "order-1", userId: "user-1", state: "accepted" }
    )) as Order;

    expect(result.state).toStrictEqual("accepted");
    expect(emailService.sent.length).toBe(1);
    expect(emailService.sent[0]).toMatchObject({
      to: "prueba@gmail.com",
      subject: "Actualización del estado de tu orden",
    });
  });

  test("Should return error if user not found", async () => {
    const result = await updateStateOrder(
      { orderService, userService, emailService },
      { orderId: "order-1", userId: "user-999" , state: "accepted" }
    );
    expect(result).toStrictEqual(Error("User not found"));
  });

  test("Should return error if user is not ADMIN", async () => {
    const result = await updateStateOrder(
      { orderService, userService, emailService },
      { orderId: "order-1", userId: "user-2" , state: "accepted" }
    );
    expect(result).toStrictEqual(Error("User is not ADMIN"));
  });

  test("Should return error if order not found", async () => {
    const result = await updateStateOrder(
      { orderService, userService, emailService },
      { orderId: "order-999", userId: "user-1" , state: "accepted" }
    );
    expect(result).toStrictEqual(Error("Order not found"));
  });
});
