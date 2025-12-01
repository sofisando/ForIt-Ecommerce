import { describe, test, expect } from "vitest";
import { MockedOrderService } from "../../services/mocks/mock-order-service";
import { MockedEmailService } from "../../services/mocks/mock-email-service";
import { orderMock } from "../../entities/mocks/order-mock";
import { notifyUpdateStateOrder } from "./notify-update-state-order";

describe("notifyUpdateStateOrder", () => {
  const emailService = new MockedEmailService();

  test("should send email when update state order", async () => {
    const orderService = new MockedOrderService([orderMock({ id: "order-1" })]);

    const result = await notifyUpdateStateOrder(
      {
        emailService,
        orderService,
      },
      { userEmail: "prueba@gmail.com", orderId: "order-1" , state: "accepted" }
    );

    expect(result).toBeUndefined(); //porque es void
    expect(emailService.sent.length).toBe(1);
    expect(emailService.sent[0]).toMatchObject({
      to: "prueba@gmail.com",
      subject: "Actualización del estado de tu orden",
    });
  });

  test("should return error when order not found", async () => {
    const orderService = new MockedOrderService([]) ;
    const result = await notifyUpdateStateOrder(
      {
        emailService,
        orderService,
      },
      { userEmail: "prueba@gmail.com", orderId: "order-1", state: "accepted" }
    );

    expect(result).toStrictEqual(Error("Order not found"));
  });
});
