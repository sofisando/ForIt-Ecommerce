import type { Service } from "../utils/types/service";
import type { Stock } from "../entities/stock";

export interface StockService extends Service<Stock> {
  getByVariantId: (variantId: string) => Promise<Stock[]>;
  getByVariantAndBranch: (variantId: string, branchId: string | null) => Promise<Stock | null>;
  getByProductAndBranch: (productId: string, branchId: string | null) => Promise<Stock | null>;
}
