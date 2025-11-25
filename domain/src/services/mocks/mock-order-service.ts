import { Order } from "../../entities/order.js";
import { User } from "../../entities/user.js";
import { CreatePayload, UpdatePayload } from "../../utils/index.js";
import { OrderService } from "../order-service.js";

export class MockedOrderService implements OrderService {
  orders: Order[] = [];

  constructor(orders: Order[]) {
    this.orders = orders;
  }

  findById = async (id: string): Promise<Order | null> => {
    return this.orders.find((order) => order.id == id) ?? null;
  };
  findAll = async (): Promise<Order[]> => {
    return this.orders;
  };
  editOne = async (data: UpdatePayload<Order>): Promise<Order> => {
    const index = this.orders.findIndex((order) => order.id === data.id);
    if (index === -1) throw Error("Order not found");

    const edited = { ...this.orders[index], ...data } as Order;
    this.orders[index] = edited;
    return edited;
  };
  create = async (data: CreatePayload<Order>): Promise<Order> => {
    const newOrder = {
      ...data,
      id: crypto.randomUUID(), //esto simula cuando la db crea el id
    } satisfies Order;

    this.orders.push(newOrder);
    return newOrder;
  };
  delete = async (data: {id: String}): Promise<void> => {
    this.orders = this.orders.filter((u) => u.id !== data.id);
  };
  getOrdersByUserId = async (userId: User['id']): Promise<Order[]> =>{
    return this.orders.filter((order)=> order.userId === userId);
  };
}
