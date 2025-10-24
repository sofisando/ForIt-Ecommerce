import type { Entity } from "../utils/types/entity";

export interface Product extends Entity {
    name: string;
    description: string;
    price: number;
    stock: number;
    categoryId: string;
}