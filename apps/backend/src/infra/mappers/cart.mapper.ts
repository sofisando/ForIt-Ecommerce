import { Cart } from "@forit/domain";
import { CartItemMapper } from "./cartItem.mapper.js";
import { Prisma } from "@infra/generated/prisma/client.js";

type PrismaCartWithItems = Prisma.CartGetPayload<{
  include: {
    items: true;
  };
}>;

export class CartMapper {
  static toDomain(PrismaCart: PrismaCartWithItems): Cart {
    return new Cart(
      PrismaCart.id,
      PrismaCart.userId,
      PrismaCart.items.map(CartItemMapper.toDomain),
      PrismaCart.createdAt,
      PrismaCart.updatedAt
    );
  }

  static toPrisma(cart: Cart) {
    return {
      id: cart.id,
      userId: cart.userId,
      createdAt: cart.createdAt,
      updatedAt: cart.updatedAt,
    };
  }
}