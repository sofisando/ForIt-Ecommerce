import { Variant } from "../variant";
import { faker } from "@faker-js/faker";

export function variantMock(opts?: Partial<Variant>): Variant {
  return {
    id: crypto.randomUUID(),
    attribute: {  title: "Tamaño", name: faker.helpers.arrayElement(Object.values(["S","M","L"])), value: null },
    productId: crypto.randomUUID(),
    ...opts,
  };
}
