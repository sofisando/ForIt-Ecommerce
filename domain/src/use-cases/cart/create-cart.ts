import type { Cart } from "../../entities/cart.js";
import { User } from "../../entities/user.js";
import type { CartService } from "../../services/cart-service.js";
import type { UserService } from "../../services/user-service.js";

interface CreateCartDeps {
  cartService: CartService;
  userService: UserService;
}
// no ponemos CreatePayload porque me pone todos las propiedades obligatorias, cuando solo necesitamos que cree vacío el carrito para agregar.
interface CreateCartPayload {
  userId: User["id"];
}

export async function createCart(
  { cartService, userService }: CreateCartDeps,
  { userId }: CreateCartPayload
): Promise<Cart | Error> {
  const foundUser = await userService.findById(userId);
  if (!foundUser)
    return new Error(`El usuario no existe`);

  const cart = await cartService.create(userId);

  return cart;
}
