import { Order, User } from "../../entities";
import { OrderService } from "../../repos/order-repository";

interface GetOrdersByUserDeps {
  orderService: OrderService;
}

interface GetOrdersByUserPayload {
  userId: User["id"];
}

export async function getOrdersByUserId(
  { orderService }: GetOrdersByUserDeps,
  { userId }: GetOrdersByUserPayload
): Promise<Order[]> {
  const filteredOrders = await orderService.getOrdersByUserId(userId);

  return filteredOrders;
}
