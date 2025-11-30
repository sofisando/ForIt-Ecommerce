import type { Entity } from "../utils/types/entity";
import type { Product } from "./product";
import type { Variant } from "./variant";

export interface Stock extends Entity {
  productId?: Product['id'];
  variantId?: Variant['id'];
  branchId: string | null; // null si no hay sucursales todavía
  quantity: number;
}

// ❗ Regla del dominio: Un stock debe tener o productId o variantId, pero no ambos al mismo tiempo.