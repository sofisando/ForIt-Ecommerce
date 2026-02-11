import { Entity } from "../utils/types/entity";

export class Variant extends Entity {
  constructor(params: {
    id: string;
    productId: string;
    attribute: {
      title: string; // "Color" | "Tamaño" | "Material"
      name: string; // "Rojo" | "S" | "Cuero"
      value: string | null; // "#ff0000" | URL de imagen | null
    };
  }) {
    super(params.id);

    if (!params.attribute.title || !params.attribute.name) {
      throw new Error("Variant attribute is invalid");
    }

    this.productId = params.productId;
    this.attribute = params.attribute; //carga todo el objeto attribute, que contiene title, name y value
  }

  public readonly productId: string;
  public readonly attribute: {
    title: string;
    name: string;
    value: string | null;
  };
}
