import { Cart } from "../../entities/cart.js";
import { Product } from "../../entities/product.js";
import { User } from "../../entities/user.js";
import { Variant } from "../../entities/variant.js";
import { CartService } from "../../services/cart-service.js";

interface RemoveProductFromCartDeps {
  cartService: CartService;
}

interface RemoveProductFromCartPayload {
  userId: User["id"];
  productId: Product["id"];
  variantId: Variant["id"] | undefined;
}

export async function removeProductFromCart(
  { cartService }: RemoveProductFromCartDeps,
  { userId, productId, variantId }: RemoveProductFromCartPayload
): Promise<Cart>  {
  const cart = await cartService.getCartByUserId(userId);
  if (!cart) throw new Error("Cart not found");

  cart.products = cart.products.filter(
    (p) => !(p.productId === productId && p.variantId === variantId)
  );
  return cartService.save(cart);
}
