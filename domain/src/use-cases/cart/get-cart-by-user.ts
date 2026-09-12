import { Cart, User } from "../../entities";
import { CartService } from "../../repos/cart-repository";
import { ProductService, DiscountService } from "../../repos";
import { applyDiscounts } from "../../utils/functions/applyDiscounts";
import { calculateCartSubtotal } from "../../utils/functions/calculateCartSubtotals";
import { calculateCartTotal } from "../../utils/functions/calculateCartTotals";

interface GetCartByUserIdDeps {
  cartService: CartService;
  productService: ProductService;
  discountService: DiscountService;
}

interface GetCartByUserIdPayload {
  userId: User["id"];
}

export async function getCartByUserId(
  { cartService, productService, discountService }: GetCartByUserIdDeps,
  { userId }: GetCartByUserIdPayload
): Promise<Cart | null> {

  const cart = await cartService.getCartByUserId(userId);
  if (!cart) return null;

  // 1️⃣ traer productos reales
  const products = await productService.findByIds(
    cart.items.map(i => i.productId)
  );

  // 2️⃣ aplicar descuentos (el dominio SOLO decide reglas)
  const itemsWithDiscount = await applyDiscounts(
    { discountService },
    cart.items.map(item => {
      const product = products.find(p => p.id === item.productId);
      if (!product) throw new Error("Product not found");

      return {
        item,
        product,
      };
    })
  );

  // 3️⃣ recalcular totales
  const cartWithItems: Cart = {
    ...cart,
    items: cart.items, // el Cart NO guarda descuentos
  };

  const withSubtotals = calculateCartSubtotal(cartWithItems, itemsWithDiscount);
  const withTotals = calculateCartTotal(withSubtotals);

  return withTotals;
}
