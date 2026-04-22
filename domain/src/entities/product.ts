import { Entity } from "../utils/types/entity";

export class Product extends Entity {
  constructor(
    id: string,
    private _name: string,
    private _description: string,
    private _imageUrl: string,
    private _price: number,
    private _categoryId: string,
    //se utiliza con _ porque sino da conflicto con el getter, para mantener el encapsulamiento se maneja con _
  ) {
    super(id);

    if (_price <= 0) {
      throw new Error("Product price must be greater than zero");
    }

    if (!_name.trim()) {
      throw new Error("Product name is required");
    }
  }

  get name() {
    return this._name;
  }
  get description() {
    return this._description;
  }
  get imageUrl() {
    return this._imageUrl;
  }
  get price() {
    return this._price;
  }
  get categoryId() {
    return this._categoryId;
  }

  changePrice(newPrice: number) {
    if (newPrice <= 0) {
      throw new Error("Product price must be greater than zero");
    }
    this._price = newPrice;
  }
}
