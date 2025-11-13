import { Cart, Product, User } from "../../entities";
import { Variant } from "../../entities/variant";
import { CartService } from "../../services";

interface UpdateProductQuantityDeps {
  cartService: CartService;
}
interface UpdateProductQuantityPayload {
  userId: User["id"];
  productId: Product["id"];
  variantId: Variant["id"] | undefined;
  quantity: number;
}

export async function updateProductQuantity(
  { cartService }: UpdateProductQuantityDeps,
  { userId, productId, variantId, quantity }: UpdateProductQuantityPayload
): Promise<Cart> {
  const cart = await cartService.getCartByUserId(userId);
  if (!cart) throw new Error("Cart not found");

  const product = cart.products.find(
    (p) => p.productId === productId && p.variantId === variantId
  );
  if (!product) throw new Error("Product not in cart");

  product.quantity = quantity;

  return cartService.save(cart);
}
