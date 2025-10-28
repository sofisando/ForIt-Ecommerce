import type { Entity } from "../utils/types/entity";

export interface Category {
    id: string;
    name: string;
}

export interface Variant { 
    id: string;
    productId: string;
    attribute: string; //acá tambien puede tener el valor hex ver como hacer con el tipo que se elije
}

export interface Product extends Entity {
    name: string;
    description: string;
    imageUrl: string;
    price: number;
    categoryId: Category['id']; //ver si esto esta bien
    variants?: Variant[];
}