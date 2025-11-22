import { Variant } from "../variant";
import { faker } from "@faker-js/faker";

export function variantMock(opts?: Partial<Variant>): Variant {
  return {
    id: crypto.randomUUID(),
    attribute: {  color: faker.color.human() }, //por el momento asíw
    productId: crypto.randomUUID(),
    ...opts,
  };
}
