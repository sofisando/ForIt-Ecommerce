import { Order } from "../../entities/order";
import { OrderService } from "../../services/order-service";
import { DeletePayload } from "../../utils/types/payload";

interface DeleteOrderDeps {
  orderService: OrderService;
}

type DeleteOrderPayload = DeletePayload<Order>

export async function deleteOrder(
  { orderService }: DeleteOrderDeps,
  { id }: DeleteOrderPayload
) : Promise<void> {
  const foundOrder = await orderService.findById(id);
  if (!foundOrder) throw new Error("Order not found");

  await orderService.delete({id});
}