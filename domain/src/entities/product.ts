import { Entity } from "../utils/types/entity";

export class Product extends Entity {
  private _name: string;
  private _description: string;
  private _imageUrl: string;
  private _price: number;
  private _categoryId: string;

  constructor(params: {
    id: string;
    name: string;
    description: string;
    imageUrl: string;
    price: number;
    categoryId: string;
  }) {
    super(params.id);

    if (params.price <= 0) {
      throw new Error("Product price must be greater than zero");
    }

    if (!params.name.trim()) {
      throw new Error("Product name is required");
    }

    this._name = params.name;
    this._description = params.description;
    this._imageUrl = params.imageUrl;
    this._price = params.price;
    this._categoryId = params.categoryId;
  }

  get price() {
    return this._price;
  }

  changePrice(newPrice: number) {
    if (newPrice <= 0) {
      throw new Error("Product price must be greater than zero");
    }
    this._price = newPrice;
  }
}
