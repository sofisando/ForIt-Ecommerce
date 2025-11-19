import type { Entity } from "../utils/types/entity.js";
import type { DiscountInCart } from "./discount.js";
import type { Product } from "./product.js";
import type { User } from "./user.js";
import type { Variant } from "./variant.js";

export interface ProductInCart {
  productId: Product["id"];
  name: string;
  price: number;
  categoryId: string;
  variantId: Variant["id"] | undefined;
  discountApplied: DiscountInCart | undefined;
  quantity: number;
  subtotal: number;
}

export interface Cart extends Entity {
  userId: User["id"];
  products: ProductInCart[];
  total: number;
}
