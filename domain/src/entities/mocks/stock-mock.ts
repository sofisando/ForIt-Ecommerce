import { faker } from "@faker-js/faker";
import { Stock } from "../stock";

export function stockMock(opts?: Partial<Stock>): Stock {
  return {
    id: crypto.randomUUID(),
    variantId: crypto.randomUUID(),
    branchId: null, //por el momento sin sucursales
    quantity: faker.number.int({ min: 0, max: 50 }),
    ...opts,
  };
}
