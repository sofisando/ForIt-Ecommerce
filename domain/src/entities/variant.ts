import { Entity } from "../utils";
import { Product } from "./product";

export interface Variant extends Entity { 
    attribute: {};
    productId: Product['id'];
    // extraPrice?: number; //para el futuro
}   