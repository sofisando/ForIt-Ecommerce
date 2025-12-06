import { UserRole, type Cart, type User } from "../../entities";
import type { DiscountService, UserService } from "../../services";
import type { CartService } from "../../services/cart-service";
import { applyDiscountsToProducts } from "../../utils/functions/applyDiscountsToProducts";
import { calculateCartSubtotal } from "../../utils/functions/calculateCartSubtotals";
import { calculateCartTotal } from "../../utils/functions/calculateCartTotals";

interface GetCartListDeps {
  cartService: CartService;
  discountService: DiscountService;
  userService: UserService;
}

interface GetCartListPayload {
  userId: User["id"];
}

export async function getCartList(
  { cartService, discountService, userService }: GetCartListDeps,
  { userId }: GetCartListPayload
): Promise<Cart[] | Error> {
  const user = await userService.findById(userId);
  if (!user) return new Error(`User ${userId} not found`);

  if (user.role !== UserRole.ADMIN) {
    return new Error(`User is not ${UserRole.ADMIN}`);
  }

  const carts = await cartService.findAll();

  const enrichedCarts = await Promise.all(
    carts.map(async (c) => {
      const enrichedProducts = await applyDiscountsToProducts(
        { discountService },
        c.products
      );

      const updatedCart: Cart = {
        ...c,
        products: enrichedProducts,
      };

      const withSubtotals = calculateCartSubtotal(updatedCart);
      const withTotals = calculateCartTotal(withSubtotals);
      return withTotals;
    })
  );

  return enrichedCarts;
}
