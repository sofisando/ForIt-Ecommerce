import { Cart, ProductInCart } from "../../entities";
import { DiscountService } from "../../services";
import { CartService } from "../../services/cart-service";
import { applyDiscountsToProducts } from "../../utils/functions/applyDiscountsToProducts";
import { calculateCartSubtotal } from "../../utils/functions/calculateCartSubtotals";
import { calculateCartTotal } from "../../utils/functions/calculateCartTotals";

interface GetCartListDeps {
  cartService: CartService;
  discountService: DiscountService;
}

export async function getCartList({
  cartService,
  discountService,
}: GetCartListDeps) {
  const carts = await cartService.findAll();
  if (!carts) throw new Error("There are not carts");

  const enrichedCarts = carts.map(async (c) => {
    const enrichedProducts = await applyDiscountsToProducts(
      { discountService },
      c.products
    );

    const updatedCart: Cart = {
      ...c,
      products: enrichedProducts,
    };

    // Recalcular subtotales
    const withSubtotals = calculateCartSubtotal(updatedCart);

    // Recalcular total
    const withTotals = calculateCartTotal(withSubtotals);
    return withTotals;
  });

  return enrichedCarts;
}
