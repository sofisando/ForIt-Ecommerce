import { Product, ProductInCart, User } from "../../entities";
import { Variant } from "../../entities/variant";
import { CartService, UserService } from "../../services";
import { createCart } from "../cart/create-cart.js";

interface AddProductToCartDeps {
  cartService: CartService;
  userService: UserService;
}

interface AddProductToCartPayload {
  userId: User["id"];
  productId: Product["id"];
  variantId: Variant["id"] | undefined;
  quantity: number;
}

export async function addProductToCart(
  { cartService, userService }: AddProductToCartDeps,
  { userId, productId, variantId, quantity }: AddProductToCartPayload
) {
  let cart = await cartService.getCartByUserId(userId);

  // ✅ Si no existe carrito, se usa el caso de uso createCart
  if (!cart) {
    const result = await createCart({ cartService, userService }, { userId });
    if (result instanceof Error) throw result;
    cart = result;
  }

  const existing = cart.products.find(
    (p) => p.productId === productId && p.variantId === variantId
  );

  if (existing) {
    existing.quantity += quantity;
  } else {
    const newProduct: ProductInCart = {
      productId,
      variantId,
      discountApplied: undefined,
      quantity,
      subtotal: 0,
    };
    cart.products.push(newProduct);
  }
  return cartService.save(cart);
}