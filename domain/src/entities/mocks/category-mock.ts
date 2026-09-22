import { Category } from "../category";
import { faker } from "@faker-js/faker";

export function categoryMock(opts?: Partial<Category>): Category {
  return new Category(
    opts?.id ?? crypto.randomUUID(),
    opts?.name ?? faker.commerce.department(),
  );
}
