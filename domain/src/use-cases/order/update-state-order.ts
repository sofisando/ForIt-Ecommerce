import { User, UserRole } from "../../entities";
import { Order, OrderState } from "../../entities/order";
import type { EmailService, OrderService, UserService } from "../../services";
import { notifyUpdateStateOrder } from "../email/notify-update-state-order";

interface UpdateStateOrderDeps {
  orderService: OrderService;
  emailService: EmailService;
  userService: UserService;
}

interface UpdateStateOrderPayload {
  orderId: Order["id"];
  userId: User["id"];
  state: Exclude<OrderState, "pending" | "canceled">;
}

export async function updateStateOrder(
  { orderService, userService, emailService }: UpdateStateOrderDeps,
  { orderId, userId, state }: UpdateStateOrderPayload
): Promise<Order | Error> {

  const user = await userService.findById(userId);
  if (!user) return new Error("User not found");
  
  if (user.role !== UserRole.ADMIN) {
    return new Error(`User is not ${UserRole.ADMIN}`);
  }
  const findedOrder = await orderService.findById(orderId);
  if (!findedOrder){
    return new Error("Order not found");
  }

  const updatedOrder = await orderService.updateStateOrder(orderId, state);

  // Mandar notificacion por email
    await notifyUpdateStateOrder(
      { emailService, orderService },
      { userEmail: user.email, orderId: findedOrder.id, state: state }
    );

  return updatedOrder;
}
