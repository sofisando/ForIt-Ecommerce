import { Order, User } from "../../entities";
import type { EmailService, OrderService } from "../../services";

interface NotifyNewOrderDeps {
  emailService: EmailService;
  orderService: OrderService;
}

interface NotifyNewOrderPayload {
  userEmail: User["email"];
  orderId: Order["id"];
}

export async function notifyNewOrder(
  { emailService, orderService }: NotifyNewOrderDeps,
  { userEmail, orderId }: NotifyNewOrderPayload
): Promise<void | Error> {
  const order = await orderService.findById(orderId);
  if (!order) return new Error("Order not found");

  const subject = "Gracias por tu compra";
  const body = `Tu orden ${orderId} fue creada correctamente`;

  await emailService.sendEmail(userEmail, subject, body);
}
