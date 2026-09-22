import { faker } from "@faker-js/faker";
import { Cart } from "../cart.js";
import { CartItem } from "../cartItem.js";
import { cartItemMock } from "./cartItem-mock.js";

interface CartMockOptions {
  id?: string;
  userId?: string;
  items?: CartItem[];
  createdAt?: Date;
  updatedAt?: Date;
}

export function cartMock(
  opts: CartMockOptions = {},
): Cart {
  return new Cart(
    opts.id ?? crypto.randomUUID(),
    opts.userId ?? faker.string.uuid(),
    opts.items ?? [cartItemMock()],
    opts.createdAt ?? faker.date.past(),
    opts.updatedAt ?? faker.date.recent(),
  );
}