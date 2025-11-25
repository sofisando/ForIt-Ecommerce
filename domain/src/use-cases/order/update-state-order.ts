import { Order, OrderState } from "../../entities/order";
import { OrderService } from "../../services/order-service";

interface UpdateStateOrderDeps {
  orderService: OrderService;
}

interface UpdateStateOrderPayload {
  id: Order["id"];
  state: OrderState;
}

export async function updateStateOrder(
  { orderService }: UpdateStateOrderDeps,
  { id, state }: UpdateStateOrderPayload
): Promise<Order | Error> {
  const findedOrder = await orderService.findById(id);
  if (!findedOrder){
    return new Error("Order not found");
  }

  const updatedOrder = await orderService.updateStateOrder(id, state);
  return updatedOrder;
}
