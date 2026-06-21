import { Cart, CartRepository } from "@forit/domain";
import { PrismaClient } from "@infra/generated/prisma/client.js";
import { CartMapper } from "@infra/mappers/cart.mapper.js";


export class CartRepositoryPrisma implements CartRepository {
  private db: PrismaClient;

  constructor(db: PrismaClient) {
    //acá va el tipo de PrismaClient
    this.db = db;
  }

  async getById(id: string): Promise<Cart | null> {
    const result = await this.db.cart.findUnique({
      where: { id },
      include: {
        items: true,
      },
    });

    if (!result) return null;

    return CartMapper.toDomain(result);
  }

  async getAll(filters: any): Promise<Cart[]> {
    const results = await this.db.cart.findMany({
      where: filters,
      include: {
        items: true,
      },
    });

    return results.map(CartMapper.toDomain);
  }

  async save(cart: Cart): Promise<void> {
    await this.db.cart.upsert({
      where: { id: cart.id },
      create: {
        id: cart.id,
        userId: cart.userId,
        items: {
          create: cart.items.map((item) => ({
            id: item.id,
            productId: item.productId,
            quantity: item.quantity,
          })),
        },
      },
      update: {
        items: {
          //borra todo y vuelve a llenar con los que trae el carrito, esto se puede cambiar despues pero mientras que quede así
          deleteMany: {},
          create: cart.items.map((item) => ({
            id: item.id,
            productId: item.productId,
            quantity: item.quantity,
          })),
        },
      },
    });
  }

  async delete(id: string): Promise<void> {
    await this.db.cart.delete({
      where: { id },
    });
  }

  async getCartByUserId(userId: string): Promise<Cart | null> {
    const result = await this.db.cart.findUnique({
      where: { userId },
      include: {
        items: true,
      },
    });

    if (!result) return null;

    return CartMapper.toDomain(result);
  }
}
