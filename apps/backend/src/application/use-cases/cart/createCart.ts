import {
  Cart,
  CartAlreadyExistsError,
  UnauthorizedError,
  UserRole,
  type AuthenticatedUser,
  type CartRepository,
} from "@forit/domain";
import { CreateCartDTO } from "@app/DTOs/index.js";

interface CreateCartDeps {
  cartRepository: CartRepository;
}

interface CreateCartPayload {
  actor: AuthenticatedUser;
  dto: CreateCartDTO;
}

export async function createCart(
  { cartRepository }: CreateCartDeps,
  { actor, dto }: CreateCartPayload,
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
    dto.items,
    dto.createdAt,
    dto.updatedAt,
  );

  await cartRepository.save(cart);

  return cart;
}
