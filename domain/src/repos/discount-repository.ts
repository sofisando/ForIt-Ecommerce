import { Discount } from "../entities/discount.js";
import type { Service } from "../utils/types/repository.js";

export interface DiscountService extends Service<Discount> {
    getActiveDiscounts: () => Promise<Discount[]>;
    findByName: (name: string) => Promise<Discount | undefined>;
}