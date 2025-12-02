import { Order, User } from "../../entities";
import type { EmailService, OrderService } from "../../services";

interface NotifyCancelOrderDeps {
  emailService: EmailService;
  orderService: OrderService;
}

interface NotifyCancelOrderPayload {
  userEmail: User["email"];
  orderId: Order["id"];
}

export async function notifyCalcelOrder(
  { emailService, orderService }: NotifyCancelOrderDeps,
  { userEmail, orderId }: NotifyCancelOrderPayload
): Promise<void | Error> {
  const order = await orderService.findById(orderId);
  if (!order) return new Error("Order not found");

  const subject = "Orden cancelada";
  const body = `Tu orden ${orderId} fue cancelada correctamente`;

  await emailService.sendEmail(userEmail, subject, body);
}
