import type { Entity } from "../utils/types/entity.js";
// ------------
// “Snapshot” del descuento en el momento del checkout
interface DiscountInCart {
  id: string;
  name: string;
  type: string;
  value: number;
}
// “Snapshot” de la variante en el momento del checkout
interface VariantInCart {
  id: string;
  attribute: {
    title: string; // "Color" | "Tamaño" | "Material"
    name: string; // "Rojo" | "S" | "Cuero"
    value: string | null; // "#ff0000" | URL de imagen | null
  };
}
// “Snapshot” del producto en el momento del checkout
export interface ProductInOrder {
  productId: string;
  name: string;
  price: number;
  variant: VariantInCart | undefined;
  discountApplied: DiscountInCart | undefined;
  quantity: number;
  subtotal: number;
}
//-----------

export const OrderState = {
  PENDING: "pending",
  ACEPTED: "accepted",
  READY: "ready",
  CANCELED: "canceled",
  DELIVERED: "delivered",
} as const;

export type OrderState = (typeof OrderState)[keyof typeof OrderState];

export interface Order extends Entity {
  userId: string;
  products: ProductInOrder[];
  branchId: string | null;
  total: number;
  state: OrderState;
  date: Date;
}
