//este caso de uso es para autorizar al administrador y obtener los carritos, plenamente para tareas de administración.

import {
  Cart,
  UnauthorizedError,
  UserRole,
  type AuthenticatedUser,
  type CartRepository,
} from "@forit/domain";
import { Prisma } from "@infra/generated/prisma/client.js";

interface GetCartsDeps {
  cartRepository: CartRepository;
}

interface GetCartsPayload {
  actor: AuthenticatedUser;
}

export async function getCarts(
  { cartRepository }: GetCartsDeps,
  { actor }: GetCartsPayload,
): Promise<Cart[]> {
  if (actor.role !== UserRole.ADMIN) {
    throw new UnauthorizedError();
  }

  const filters: Prisma.CartWhereInput = {};

  const carts = await cartRepository.getAll(filters);

  return carts;
}
