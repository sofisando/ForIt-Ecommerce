import { Entity } from "../utils";
import { Product } from "./product";

export interface Variant extends Entity {
  attribute: {
    title: string; // "Color" | "Tamaño" | "Material"
    name: string; // "Rojo" | "S" | "Cuero"
    value: string | null; // "#ff0000" | URL de imagen | null
  };
  productId: Product["id"];
  // extraPrice?: number; //para el futuro
}
