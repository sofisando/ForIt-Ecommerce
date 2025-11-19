import { faker } from "@faker-js/faker";
import type { Cart } from "../cart";
import { DiscountType } from "../discount";

export function cartMock(opts?: Partial<Cart>): Cart {
  const hasVariant = faker.datatype.boolean();
  const hasDiscount = faker.datatype.boolean();

  return {
    id: crypto.randomUUID(),
    userId: faker.string.uuid(),
    products: [
      {
        productId: crypto.randomUUID(),
        name: faker.commerce.productName(),
        price: faker.number.int({ max: 10000, min: 5000 }),
        categoryId:  crypto.randomUUID(),
        variantId: hasVariant ? crypto.randomUUID() : undefined,
        discountApplied: hasDiscount
          ? {
              id: crypto.randomUUID(),
              name: faker.commerce.productAdjective(),
              type: faker.helpers.arrayElement(Object.values(DiscountType)),
              value: faker.number.int({ min: 5, max: 50 }),
            }
          : undefined,
        quantity: faker.number.int({ min: 1, max: 10 }),
        subtotal: faker.number.int({ min: 0, max: 500 }),
      },
    ],
    total: faker.number.int({ min: 0, max: 1000 }),
    ...opts,
  };
}
