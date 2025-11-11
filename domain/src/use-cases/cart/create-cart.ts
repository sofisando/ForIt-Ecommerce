import type { Cart } from "../../entities/cart.js";
import type { User } from "../../entities/user.js";
import type { CartService } from "../../services/cart-service.js";
import type { UserService } from "../../services/user-service.js";
import type { CreatePayload } from "../../utils/index.js";

interface CreateCartDeps {
  cartService: CartService;
  userService: UserService;
}
// no ponemos CreatePayload en el payload del carrito porque me pone todos las propiedades obligatorias, cuando solo necesitamos que lo cree vacío para agregar después.
interface CreateCartPayload {
  userId: User["id"];
}

function createEmptyCart(userId: User["id"]): CreatePayload<Cart> {
  return {
    userId,
    products: [],
    total: 0,
  };
}

export async function createCart(
  { cartService, userService }: CreateCartDeps,
  { userId }: CreateCartPayload
): Promise<Cart | Error> {
  const foundUser = await userService.findById(userId);
  if (!foundUser) return new Error(`El usuario no existe`);
  
  const existingCart = await cartService.getCartByUserId(userId);
  if (existingCart) return new Error(`El carrito del usuario ya existe`);

  const newCart = createEmptyCart(userId);
  const saveCart = await cartService.create(newCart);

  return saveCart;
}
