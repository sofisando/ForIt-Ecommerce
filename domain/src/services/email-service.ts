import type { User } from "../entities";
import type { Order, OrderState } from "../entities/order";

export interface EmailService {
  sendEmail: (to: string, subject: string, body: string) => Promise<void>;
  notifyUserRegistration: (userEmail: User['email']) => Promise<void>;
  notifyNewOrder: (userEmail: User['email'], orderId: Order['id']) => Promise<void>;
  notifyDropOrder: (userEmail: User['email'], orderId: Order['id']) => Promise<void>;
  notifyUpdateStateOrder: (userEmail: User['email'], orderId: Order['id'], newState: OrderState) => Promise<void>;
}

