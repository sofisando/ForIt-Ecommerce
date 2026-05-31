import { Entity } from "../utils/types/entity";
import { Money } from "../ValueObjects/Money";

export class Product extends Entity {
  constructor(
    id: string,
    private _name: string,
    private _description: string,
    private _imageUrl: string,
    private _price: Money,
    private _categoryId: string,
    //se utiliza con _ porque sino da conflicto con el getter, para mantener el encapsulamiento se maneja con _
  ) {
    super(id);

    this.validateName(_name);
  }

  private validateName(name: string): void {
    if (!name.trim()) {
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
  
  changeName(newName: string): void {
    this.validateName(newName);
    this._name = newName;
  }
  changeDescription(newDescription: string): void {
    this._description = newDescription;
  }
  changeImageUrl(newImageUrl: string): void {
    this._imageUrl = newImageUrl;
  }
  changePrice(newPrice: Money) {
    this._price = newPrice;
  }
  changeCategory(newCategoryId: string): void {
    this._categoryId = newCategoryId;
  }
}
