import { describe, test, expect } from "vitest";
import { MockedOrderService } from "../../services/mocks/mock-order-service";
import { MockedEmailService } from "../../services/mocks/mock-email-service";
import { orderMock } from "../../entities/mocks/order-mock";
import { notifyCalcelOrder } from "./notify-cancel-order";

describe("notifyCalcelOrder", () => {
  const emailService = new MockedEmailService();

  test("should send email when cancel order", async () => {
    const orderService = new MockedOrderService([orderMock({ id: "order-1" })]);

    const result = await notifyCalcelOrder(
      {
        emailService,
        orderService,
      },
      { userEmail: "prueba@gmail.com", orderId: "order-1" }
    );

    expect(result).toBeUndefined(); //porque es void
    expect(emailService.sent.length).toBe(1);
    expect(emailService.sent[0]).toMatchObject({
      to: "prueba@gmail.com",
      subject: "Orden cancelada",
    });
  });

  test("should return error when order not found", async () => {
    const orderService = new MockedOrderService([]) ;
    const result = await notifyCalcelOrder(
      {
        emailService,
        orderService,
      },
      { userEmail: "prueba@gmail.com", orderId: "order-1" }
    );

    expect(result).toStrictEqual(Error("Order not found"));
  });
});
