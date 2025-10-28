import type { Variant } from "../entities/product.js";
import type { Service } from "../utils/types/service.js";

export interface VariantService extends Service<Variant> {
    getVariantsByProduct: (productId: string) => Promise<Variant[]>;
}