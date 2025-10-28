import type { Entity } from "../utils/types/entity";

export interface Category extends Entity {
    name: string;
}

export interface Variant extends Entity { 
    attribute: string;
    // stock si se complica
}

//se recuenda no poner discount ya que en la entidad discount estan los listados de productos y categorias aplicadas
export interface Product extends Entity {
    name: string;
    description: string;
    imageUrl: string;
    price: number;
    categoryId: Category['id'];
    variants?: Variant[];
}