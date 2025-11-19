import { Cart, ProductInCart, User } from "../../entities";
import { CartService } from "../../services/cart-service";
import { DiscountService } from "../../services";
import { calculateCartSubtotal } from "../../utils/functions/calculateCartSubtotals";
import { calculateCartTotal } from "../../utils/functions/calculateCartTotals";
import { applyDiscountsToProducts } from "../../utils/functions/applyDiscountsToProducts";

interface GetCartByUserIdDeps {
  cartService: CartService;
  discountService: DiscountService;
}

interface GetCartByUserIdPayload {
  userId: User["id"];
}

export async function getCartByUserId(
  { cartService, discountService }: GetCartByUserIdDeps,
  { userId }: GetCartByUserIdPayload
): Promise<Cart | null> {

  const cart = await cartService.getCartByUserId(userId);
  if (!cart) return null;

  // Enriquecemos ProductInCart con discountApplied
  const enrichedProducts = await applyDiscountsToProducts(
    { discountService },
    cart.products
  ) as (ProductInCart)[];

  // Reemplazamos solo la parte de products
  const updatedCart: Cart = {
    ...cart,
    products: enrichedProducts,
  };

  // Recalcular subtotales
  const withSubtotals = calculateCartSubtotal(updatedCart);

  // Recalcular total
  const withTotals = calculateCartTotal(withSubtotals);

  return withTotals;
}
