import { Cart } from "../../entities";

export function calculateCartTotal(cart: Cart): Cart {
  const total = cart.products.reduce((acc, p) => acc + p.subtotal, 0);
  return { ...cart, total };
}
