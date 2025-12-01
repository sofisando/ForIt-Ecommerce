import { Order, OrderState, User } from "../../entities";
import { EmailService } from "../../services";
import { OrderService } from "../../services/order-service";

interface NotifyCancelOrderDeps {
  emailService: EmailService;
  orderService: OrderService;
}

interface NotifyCancelOrderPayload {
  userEmail: User["email"];
  orderId: Order["id"];
  state: Exclude<OrderState, "pending" | "canceled">;
}

export async function notifyUpdateStateOrder(
  { emailService, orderService }: NotifyCancelOrderDeps,
  { userEmail, orderId }: NotifyCancelOrderPayload
): Promise<void | Error> {
  const order = await orderService.findById(orderId);
  if (!order) return new Error("Order not found");

  const subject = "Actualización del estado de tu orden";
  const body = `¡Tu orden ${orderId} ya está más cerca! Hemos actualizado el estado de tu orden a '${order.state}.`;
  //en algun futuro ponerl enlace a seguimiento de orden y detalles de la orden
  //tambien poner el mail para cuando recibe el producto que diga que lo disfrute.

  await emailService.sendEmail(userEmail, subject, body);
}
