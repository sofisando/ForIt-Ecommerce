import { User, UserRole } from "../../entities";
import { Order } from "../../entities/order";
import type { OrderService, UserService } from "../../services";
import { DeletePayload } from "../../utils/types/payload";

interface DeleteOrderDeps {
  orderService: OrderService;
  userService: UserService;
}

type DeleteOrderPayload = DeletePayload<Order> & {
  userId: User["id"];
};

export async function deleteOrder(
  { orderService, userService }: DeleteOrderDeps,
  { id, userId }: DeleteOrderPayload
): Promise<void | Error> {
  const user = await userService.findById(userId);
  if (!user) return new Error(`User ${userId} not found`);

  if (user.role !== UserRole.ADMIN) {
    return new Error(`User is not ${UserRole.ADMIN}`);
  }

  const order = await orderService.findById(id);
  if (!order) return new Error("Order not found");

  await orderService.delete({ id });
}
