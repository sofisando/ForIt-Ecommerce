import type { Entity } from "../utils/types/entity.js";

export interface CartItem {
  productId: string;
  variantId?: string;
  quantity: number;
}

export interface Cart extends Entity {
  userId: string;
  items: CartItem[];
}
