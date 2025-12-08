import { faker } from "@faker-js/faker";
import type { Order } from "../order.js";
import { OrderState } from "../order.js";
import { DiscountType } from "../discount.js";

export function orderMock(opts?: Partial<Order>): Order {
  // 50% de probabilidad de que haya variante o descuento
  const hasVariant = faker.datatype.boolean();
  const hasDiscount = faker.datatype.boolean();

  const variant = hasVariant
    ? {
        id: crypto.randomUUID(),
        attribute: {
          title: "Tamaño",
          name: faker.helpers.arrayElement(Object.values(["S", "M", "L"])),
          value: null,
        },
        productId: crypto.randomUUID(),
      }
    : undefined;

  const discountApplied = hasDiscount
    ? {
        id: crypto.randomUUID(),
        name: faker.internet.domainWord(),
        type: faker.helpers.arrayElement(Object.values(DiscountType)),
        value: faker.number.int({ min: 5, max: 50 }),
        active: true,
        dateFrom: faker.date.recent({ days: 10 }),
        dateTo: faker.date.soon({ days: 10 }),
        productsApplied: [crypto.randomUUID()],
        categoriesApplied: [],
      }
    : undefined;

  const products = [
    {
      productId: crypto.randomUUID(),
      name: faker.commerce.productName(),
      price: faker.number.int({ min: 1000, max: 10000 }),
      categoryId:  crypto.randomUUID(),
      variant,
      discountApplied,
      quantity: faker.number.int({ min: 1, max: 3 }),
      subtotal: faker.number.int({ min: 1000, max: 30000 }),
    },
  ];

  return {
    id: crypto.randomUUID(),
    userId: crypto.randomUUID(),
    products,
    branchId: null,
    total: products.reduce((sum, p) => sum + p.subtotal, 0),
    state: faker.helpers.arrayElement(Object.values(OrderState)),
    date: faker.date.recent({ days: 5 }),
    ...opts,
  };
}
