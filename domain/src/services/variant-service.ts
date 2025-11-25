import { Variant } from "../entities/variant.js";
import type { Service } from "../utils/types/service.js";

export interface VariantService extends Service<Variant> {
  getVariantsByProduct: (productId: string) => Promise<Variant[]>;
  findByAttribute(
    productId: string,
    title: string,
    name: string
  ): Promise<Variant | null>;
}