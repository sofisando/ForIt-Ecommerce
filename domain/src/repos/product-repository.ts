import { Product } from "../entities/product.js";
import type { Repository } from "../utils/types/repository.js";

export interface ProductRepository extends Repository<Product> {
    getByIds(ids: string[]): Promise<Product[]>;
}

// apply-discount-to-product.ts  en use-cases