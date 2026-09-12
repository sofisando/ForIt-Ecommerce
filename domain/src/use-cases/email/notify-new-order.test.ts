import { describe, test, expect } from "vitest";
import { MockedOrderService } from "../../../../apps/backend/src/application/mocks/mock-order-repo";
import { MockedEmailService } from "../../../../apps/backend/src/application/mocks/mock-email-service";
import { notifyNewOrder } from "./notify-new-order";
import { orderMock } from "../../entities/mocks/order-mock";

describe("notifyNewOrder", () => {
  const emailService = new MockedEmailService();

  test("should send email when create a new order", async () => {
    const orderService = new MockedOrderService([orderMock({ id: "order-1" })]);

    const result = await notifyNewOrder(
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
      subject: "Gracias por tu compra",
    });
  });

  test("should return error when order not found", async () => {
    const orderService = new MockedOrderService([]) ;
    const result = await notifyNewOrder(
      {
        emailService,
        orderService,
      },
      { userEmail: "prueba@gmail.com", orderId: "order-1" }
    );

    expect(result).toStrictEqual(Error("Order not found"));
  });
});
