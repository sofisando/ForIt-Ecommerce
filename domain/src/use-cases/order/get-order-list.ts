import { Order, User, UserRole } from "../../entities";
import type { UserService } from "../../services";
import type { OrderService } from "../../services/order-service";

interface GetOrderListDeps {
  orderService: OrderService;
  userService: UserService;
}

interface GetOrderListPayload {
  userId: User["id"];
}

export async function getOrderList(
  { orderService, userService }: GetOrderListDeps,
  { userId }: GetOrderListPayload
): Promise<Order[] | Error> {
  const user = await userService.findById(userId);
  if (!user) return new Error(`User ${userId} not found`);

  if (user.role !== UserRole.ADMIN) {
    return new Error(`User is not ${UserRole.ADMIN}`);
  }

  const orders = await orderService.findAll();
  return orders;
}