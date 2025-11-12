import type { Cart } from "../entities/cart.js";
import type { User } from "../entities/user.js";
import type { CreatePayload } from "../utils/index.js";
import type { Service } from "../utils/types/service.js";

//se omite create del tipo genérico porque el mismo pide todos los campos, en el cart se debe crear vacío el cart y luego añadir o remover productos
export interface CartService extends Omit<Service<Cart>, "create" | "editOne"> {
  create: (data: CreatePayload<Cart>) => Promise<Cart>;
  save: (cart: Cart) => Promise<Cart>; // reemplaza a editOne
  getCartByUserId: (userId: User['id']) => Promise<Cart | null>;
}
