import type { Entity } from "../utils/types/entity";
import type { Variant } from "./variant";

export interface Stock extends Entity {
  variantId: Variant['id'];
  branchId: string | null; // null si no hay sucursales todavía
  quantity: number;
}
