import { User } from "../../entities/user.js";
import { CartService } from "../../services/cart-service.js";


interface ClearCartDeps {
  cartService: CartService;
}

interface AddProductToCartPayload {
  userId: User["id"];
}

export async function clearCart(
  {cartService}: ClearCartDeps,
  {userId}: AddProductToCartPayload, 
) {
  const cart = await cartService.getCartByUserId(userId);
  if (!cart) return new Error("Cart not found");

  cart.products = [];
  cart.total = 0;

  return cartService.save(cart);
}
