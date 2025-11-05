import { faker } from "@faker-js/faker";
import { Discount, DiscountType } from "../discount";

export function discountMock(opts?: Partial<Discount>): Discount {
  return {
    id: crypto.randomUUID(),
    name: faker.internet.domainWord(),
    type: faker.helpers.arrayElement(Object.values(DiscountType)),
    value: faker.number.int({ min: 1, max: 99 }),
    productsApplied: [faker.string.uuid(), faker.string.uuid()],
    categoriesApplied: [faker.string.uuid(), faker.string.uuid()],
    active: faker.datatype.boolean(),
    dateFrom: faker.date.past(),
    dateTo: faker.date.future(),
    ...opts,
  };
}
