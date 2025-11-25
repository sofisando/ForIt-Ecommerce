import type { Order, OrderState } from "../entities/order.js";
import type { User } from "../entities/user.js";
import type { Service } from "../utils/types/service.js";

export interface OrderService extends Service<Order> {
  getOrdersByUserId: (userId: User['id']) => Promise<Order[]>;
  updateStateOrder: (id: Order['id'], state: OrderState) => Promise<Order | Error>;
}
