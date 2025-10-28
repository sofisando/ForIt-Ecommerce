import type { Category, Product } from "../entities/product.js";
import type { Service } from "../utils/types/service.js";

export interface ProductService extends Service<Product> {
  getProductsByCategory: (categoryId: Category['id']) => Promise<Product[]>;
  getProductsSearch: (query: string) => Promise<Product[]>;
}

// apply-discount-to-product.ts  en use-cases