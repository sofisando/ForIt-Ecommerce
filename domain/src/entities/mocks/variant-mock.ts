import { Variant } from "../variant";
import { faker } from "@faker-js/faker";

export function variantMock(opts?: Partial<Variant>): Variant {
  return {
    id: crypto.randomUUID(),
    attribute: faker.commerce.productMaterial(),
    ...opts,
  };
}
