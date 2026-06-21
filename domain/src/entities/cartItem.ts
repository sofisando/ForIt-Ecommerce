import { Entity } from "../utils/types/entity";

export class CartItem extends Entity {
  constructor(
    id: string,
    private _productId: string,
    private _quantity: number,
    // private _variantId?: string,
  ) {
    super(id);

    this.validateQuantity(_quantity);
  }

  private validateQuantity(quantity: number): void {
    if (quantity <= 0) {
      throw new Error("Quantity must be greater than zero");
    }
  }

  get productId(): string {
    return this._productId;
  }

  get quantity(): number {
    return this._quantity;
  }

  // get variantId(): string | undefined {
  //   return this._variantId;
  // }

  increaseQuantity(amount: number): void {
    if (amount <= 0) {
      throw new Error("Amount must be greater than zero");
    }

    this._quantity += amount;
  }

  decreaseQuantity(amount: number): void {
    if (amount <= 0) {
      throw new Error("Amount must be greater than zero");
    }

    if (this._quantity - amount <= 0) {
      throw new Error("Quantity cannot be less than one");
    }

    this._quantity -= amount;
  }

  changeQuantity(quantity: number): void {
    this.validateQuantity(quantity);
    this._quantity = quantity;
  }
}