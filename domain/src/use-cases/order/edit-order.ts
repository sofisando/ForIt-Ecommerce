import { User, UserRole } from "../../entities";
import { Order } from "../../entities/order";
import { UserService } from "../../services";
import { OrderService } from "../../services/order-service";
import { UpdatePayload } from "../../utils/types/payload";

interface EditOrderDeps {
  orderService: OrderService;
  userService: UserService;
}

type EditOrderPayload = UpdatePayload<Omit<Order, "userId">> & {
  userId: User["id"];
};

export async function editOrder(
  { orderService, userService }: EditOrderDeps,
  payload: EditOrderPayload
): Promise<Order | Error> {
  const user = await userService.findById(payload.userId);
  if (!user) return new Error(`User ${payload.userId} not found`);

  if (user.role !== UserRole.ADMIN) {
    return new Error(`User is not ${UserRole.ADMIN}`);
  }

  const existing = await orderService.findById(payload.id);
  if (!existing) return new Error("Order not found");

  const updated = await orderService.editOne(payload);
  return updated;
}
