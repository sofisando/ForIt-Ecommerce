import type { Cart } from "../entities/cart.js";
import { Repository } from "../utils/index.js";

//no creamos el carrito antes, porque para tenerlo vacío conviene no tener nada
export interface CartRepository extends Repository<Cart> {
  getCartByUserId: (userId: string) => Promise<Cart | null>;
}