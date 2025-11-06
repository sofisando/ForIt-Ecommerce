import type { Entity } from "../utils/types/entity.js";
import type { Category } from "./category.js";
import type { Product } from "./product.js";

export const DiscountType = {
    PERCENTAGE: "PERCENTAGE",
    FIXED_AMOUNT: "FIXED_AMOUNT",
} as const;

export type DiscountType = typeof DiscountType[keyof typeof DiscountType];

export interface Discount extends Entity {
    name: string;
    type: DiscountType;
    value: number;
    productsApplied: Product['id'][] | undefined;
    categoriesApplied: Category['id'][] | undefined;
    active: boolean;
    dateFrom: Date;
    dateTo: Date;
}


export type DiscountInCart = Pick<Discount, "id" | "name" | "value" | "type">;