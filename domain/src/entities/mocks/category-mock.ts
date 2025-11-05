import { Category } from "../category";
import { faker } from "@faker-js/faker";

export function categoryMock(opts?: Partial<Category>): Category {
  return {
    id: crypto.randomUUID(),
    name: faker.commerce.department(),
    ...opts,
  };
}
