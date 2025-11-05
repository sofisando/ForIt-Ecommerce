import type { Entity } from "../utils/types/entity";
import { Category } from "./category";
import { Variant } from "./variant";

//se recuenda no poner discount ya que en la entidad discount estan los listados de productos y categorias aplicadas
export interface Product extends Entity {
    name: string;
    description: string;
    imageUrl: string;
    price: number;
    categoryId: Category['id'];
    variants?: Variant[];
}
