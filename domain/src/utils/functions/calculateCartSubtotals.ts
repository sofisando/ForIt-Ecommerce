import { Cart } from "../../entities";
import { DiscountType } from "../../entities/discount";

export function calculateCartSubtotal(cart: Cart): Cart {
  const updatedProducts = cart.products.map((p) => {
    let price = p.price;

    if (p.discountApplied) {
      if (p.discountApplied.type === DiscountType.PERCENTAGE) {
        price = price - price * (p.discountApplied.value / 100);
      } else {
        price = price - p.discountApplied.value;
      }
      if (price < 0) price = 0;
    }

    return {
      ...p,
      subtotal: price * p.quantity,
    };
  });

  return { ...cart, products: updatedProducts };
}
