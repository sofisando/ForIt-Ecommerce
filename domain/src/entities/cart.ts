import type { Entity } from "../utils/types/entity.js";
import type { DiscountInCart } from "./discount.js";
import type { Product, Variant } from "./product.js";

export interface ProductInCart {
    productId: Product['id'];
    variantId?: Variant['id'];
    discountApplied?: DiscountInCart;
    quantity: number;
    subtotal: number;
}

export interface Cart extends Entity{
    userId: string;
    products: ProductInCart[];
    total: number;
}