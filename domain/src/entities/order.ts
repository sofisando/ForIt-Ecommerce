import type { Entity } from "../utils/types/entity.js";
import type { ProductInCart } from "./cart.js";

export const OrderState = {
    PENDING: "pending",
    ACEPTED: "accepted",
    READY: "ready",
    CANCELED: "canceled",
    DELIVERED: "delivered",
} as const;

export type OrderState = typeof OrderState[keyof typeof OrderState];

//ver como poner o donde poner para que esto quede como constante
//se que habia una forma como pick<> para copiar y a ese le ponemos as const o algo asi
export interface Order extends Entity{
    userId: string;
    products: ProductInCart[];
    total: number;
    state: OrderState;
    date: Date;
}
