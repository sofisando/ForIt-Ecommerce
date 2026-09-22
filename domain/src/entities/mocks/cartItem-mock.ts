import { faker } from "@faker-js/faker";
import { CartItem } from "../cartItem.js";

interface CartItemMockOptions {
  id?: string;
  productId?: string;
  quantity?: number;
  // variantId?: string;
}

export function cartItemMock(
  opts: CartItemMockOptions = {},
): CartItem {
  return new CartItem(
    opts.id ?? crypto.randomUUID(),
    opts.productId ?? crypto.randomUUID(),
    opts.quantity ?? faker.number.int({ min: 1, max: 10 }),
  );
}