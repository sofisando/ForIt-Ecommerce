//este caso de uso solo va a crear el carrito, sin items (productos) dentro.

import {
  Cart,
  CartAlreadyExistsError,
  UnauthorizedError,
  UserRole,
  type AuthenticatedUser,
  type CartRepository,
} from "@forit/domain";

interface CreateCartDeps {
  cartRepository: CartRepository;
}

interface CreateCartPayload {
  actor: AuthenticatedUser;
}

export async function createCart(
  { cartRepository }: CreateCartDeps,
  { actor }: CreateCartPayload,
): Promise<Cart> {
  if (actor.role !== UserRole.CLIENT) {
    throw new UnauthorizedError();
  }

  const existingCart = await cartRepository.getCartByUserId(actor.userId);
  if (existingCart) {
    throw new CartAlreadyExistsError(actor.userId);
  }

  const cart = new Cart(
    crypto.randomUUID(),
    actor.userId,
    [],
    new Date(), // Se establece la fecha de creación como la fecha actual
    new Date(), // Se establece la fecha de actualización como la fecha actual
  );

  await cartRepository.save(cart);

  return cart;
}
