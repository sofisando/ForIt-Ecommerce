import { faker } from "@faker-js/faker";
import type { Stock } from "../stock";

export function stockMock(opts: Partial<Stock> = {}): Stock {
  const stock: Stock = {
    id: opts.id ?? crypto.randomUUID(),
    branchId: opts.branchId ?? null,
    quantity: opts.quantity ?? faker.number.int({ min: 0, max: 50 }),
    // solamente agregamos productId / variantId si vienen en opts
    ...(opts.productId !== undefined ? { productId: opts.productId } : {}),
    ...(opts.variantId !== undefined ? { variantId: opts.variantId } : {})
  };

  // Regla del dominio: si tiene variantId → eliminar productId
  if ("variantId" in stock) {
    delete stock.productId;
  }

  // Regla del dominio: si tiene productId → eliminar variantId
  if ("productId" in stock) {
    delete stock.variantId;
  }

  return stock;
}
