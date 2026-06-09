import { faker } from "@faker-js/faker";
import { Money } from "../../ValueObjects/Money.js";
import { Product } from "../product.js";

export function productMock(opts?: Partial<Product>): Product {
  return new Product(
    opts?.id ?? crypto.randomUUID(),
    opts?.name ?? faker.commerce.product(),
    opts?.description ?? faker.commerce.productDescription(),
    opts?.imageUrl ?? faker.image.urlLoremFlickr(),
    opts?.price ?? new Money(faker.number.int({ min: 5000, max: 10000 })),
    opts?.categoryId ?? crypto.randomUUID(),
  );
}