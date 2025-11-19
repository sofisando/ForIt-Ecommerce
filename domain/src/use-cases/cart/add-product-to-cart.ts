import { Product, ProductInCart, User } from "../../entities";
import { Variant } from "../../entities/variant";
import { CartService, UserService, ProductService } from "../../services";
import { createCart } from "../cart/create-cart.js";

interface AddProductToCartDeps {
  cartService: CartService;
  userService: UserService;
  productService: ProductService;
}

interface AddProductToCartPayload {
  userId: User["id"];
  productId: Product["id"];
  variantId: Variant["id"] | undefined;
  quantity: number;
}

export async function addProductToCart(
  { cartService, userService, productService }: AddProductToCartDeps,
  { userId, productId, variantId, quantity }: AddProductToCartPayload
) {
  let cart = await cartService.getCartByUserId(userId);

  // Si no existe carrito, lo crea
  if (!cart) {
    const result = await createCart({ cartService, userService }, { userId });
    if (result instanceof Error) throw result;
    cart = result;
  }

  // Buscar si ya existe un producto igual (mismo id y variante)
  const existing = cart.products.find(
    (p) => p.productId === productId && p.variantId === variantId
  );

  if (existing) {
    existing.quantity += quantity;
  } else {
    // Buscar el producto real para armar snapshot
    const product = await productService.findById(productId);
    if (!product) throw new Error("Product not found");

    const newProduct: ProductInCart = {
      productId,
      name: product.name,
      price: product.price,
      categoryId: product.categoryId,
      variantId,
      discountApplied: undefined,
      quantity,
      subtotal: 0,
    };

    cart.products.push(newProduct);
  }

  return cartService.save(cart);
}