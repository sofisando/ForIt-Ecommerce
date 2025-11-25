import { Order } from "../../entities/order";
import { OrderService } from "../../services/order-service";
import { UpdatePayload } from "../../utils/types/payload";

interface EditOrderDeps {
  orderService: OrderService;
}

type EditOrderPayload = UpdatePayload<Omit<Order, "userId">>;

export async function editOrder(
  { orderService }: EditOrderDeps,
  payload: EditOrderPayload
): Promise<Order> {
  const existing = await orderService.findById(payload.id);
  if (!existing) throw new Error("Order not found");

  const updated = await orderService.editOne(payload);
  return updated;
}
