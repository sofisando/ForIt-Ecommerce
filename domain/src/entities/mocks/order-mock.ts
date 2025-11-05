import { faker } from "@faker-js/faker";
import { Order, OrderState } from "../order";
import { DiscountType } from "../discount";

export function orderMock(opts?: Partial<Order>): Order {
  const hasVariant = faker.datatype.boolean();
  const hasDiscount = faker.datatype.boolean();

  return {
    id: crypto.randomUUID(),
    userId: faker.string.uuid(),
    products: [
      {
        productId: crypto.randomUUID(),
        ...(hasVariant ? { variantId: crypto.randomUUID() } : {}),
        ...(hasDiscount
          ? {
              discountApplied: {
                id: crypto.randomUUID(),
                name: faker.commerce.productAdjective(),
                type: faker.helpers.arrayElement(Object.values(DiscountType)),
                value: faker.number.int({ min: 5, max: 50 }),
              },
            }
          : {}),
        quantity: faker.number.int({ min: 1, max: 10 }),
        subtotal: faker.number.int({ min: 0, max: 500 }),
      },
    ],
    total: faker.number.int({ min: 0, max: 1000 }),
    date: faker.date.past(),
    state:faker.helpers.arrayElement(Object.values(OrderState)),
    ...opts,
  };
}
