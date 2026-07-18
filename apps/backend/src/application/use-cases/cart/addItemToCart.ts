import { AddItemToCartDTO } from "@app/DTOs/cart.dto.js";
import { AuthenticatedUser, CartItem, CartNotFoundError, CartRepository } from "@forit/domain";

interface AddItemToCartDeps {
  cartRepository: CartRepository;
}

interface AddItemToCartPayload {
  actor: AuthenticatedUser;
  dto: AddItemToCartDTO;
}

export async function addItemToCart(
  { cartRepository }: AddItemToCartDeps,
  { actor, dto }: AddItemToCartPayload,
): Promise<void> {
  const cart = await cartRepository.getCartByUserId(actor.userId);
  if (!cart) throw new CartNotFoundError();

  const item = new CartItem(crypto.randomUUID(), dto.productId, dto.quantity);

  cart.addItem(item);

  await cartRepository.save(cart);
}
