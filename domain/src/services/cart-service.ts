import type { Cart } from "../entities/cart.js";
import type { Product } from "../entities/product.js";
import type { User } from "../entities/user.js";
import type { Variant } from "../entities/variant.js";
import type { Service } from "../utils/types/service.js";

export interface CartService extends Service<Cart> {
    getCartByUserId: (userId: User['id']) => Promise<Cart | null>;
    addProductToCart: (userId: User['id'], productId: Product['id'], variantId: Variant['id'] | undefined, quantity: number) => Promise<Cart>;
    removeProductFromCart: (userId: User['id'], productId: Product['id'], variantId: Variant['id'] | undefined) => Promise<Cart>;
    updateProductQuantity: (userId: User['id'], productId: Product['id'], variantId: Variant['id'] | undefined, quantity: number) => Promise<Cart>;
    clearCart: (userId: User['id']) => Promise<Cart>;
}