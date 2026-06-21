import type { Cart } from "../entities/cart.js";
import type { User } from "../entities/user.js";
import { Repository } from "../utils/index.js";

//no creamos el carrito antes, porque para tenerlo vacío conviene no tener nada
export interface CartRepository extends Repository<Cart> {
  getCartByUserId: (userId: User['id']) => Promise<Cart | null>;
}