import { CartItem } from "@forit/domain";
import { CartItem as PrismaCartItem } from "@infra/generated/prisma/client.js";

//si agrego la varianteId acá hay que ponerlo también
export class CartItemMapper {
  static toDomain(item: PrismaCartItem): CartItem {
    return new CartItem(
      item.id,
      item.productId,
      item.quantity
    );
  }

  static toPrisma(cart: CartItem) {
      return {
        id: cart.id,
        productId: cart.productId,
        quantity: cart.quantity
      };
    }
}