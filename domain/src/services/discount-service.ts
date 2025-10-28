import { Discount } from "../entities/discount.js";
import type { Service } from "../utils/types/service.js";

export interface DiscountService extends Service<Discount> {
    getActiveDiscounts: () => Promise<Discount[]>;
}