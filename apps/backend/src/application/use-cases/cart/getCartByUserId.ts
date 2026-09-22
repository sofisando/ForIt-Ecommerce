import { CartResponseDTO } from "@app/DTOs/cart.dto.js";
import {
  AuthenticatedUser,
  CartNotFoundError,
  CartRepository,
  ProductNotFoundError,
  ProductRepository,
} from "@forit/domain";

interface GetCartByUserIdDeps {
  cartRepository: CartRepository;
  productRepository: ProductRepository;
}

interface GetCartByUserIdPayload {
  actor: AuthenticatedUser;
}

export async function getCartByUserId(
  { cartRepository, productRepository }: GetCartByUserIdDeps,
  { actor }: GetCartByUserIdPayload,
): Promise<CartResponseDTO> {
  const cart = await cartRepository.getCartByUserId(actor.userId);

  if (!cart) {
    throw new CartNotFoundError();
  }

  const products = await productRepository.getByIds(
    cart.items.map((item) => item.productId),
  );

  const productsMap = new Map(products.map((product) => [product.id, product]));

  const items = cart.items.map((item) => {
    const product = productsMap.get(item.productId);

    if (!product) {
      throw new ProductNotFoundError(item.productId);
    }

    return {
      productId: item.productId,
      quantity: item.quantity,
      name: product.name,
      price: Number(product.price),
      imageUrl: product.imageUrl,
      subtotal: Number(product.price) * item.quantity,
    };
  });

  const total = items.reduce((sum, item) => sum + item.subtotal, 0);

  return {
    id: cart.id,
    userId: cart.userId,
    totalItems: cart.totalItems,
    total,
    items,
    createdAt: cart.createdAt,
    updatedAt: cart.updatedAt,
  };
}
