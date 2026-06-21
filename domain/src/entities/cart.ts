import { Entity } from "../utils/types/entity";
import { CartItem } from "./cartItem";

export class Cart extends Entity {
  constructor(
    id: string,
    private _userId: string,
    private _items: CartItem[],
    private _createdAt: Date,
    private _updatedAt: Date,
  ) {
    super(id);
  }

  get userId(): string {
    return this._userId;
  }

  get items(): CartItem[] {
    return [...this._items];
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  addItem(item: CartItem): void {
    const existingItem = this._items.find(
      (i) => i.productId === item.productId,
      // && 
      // i.variantId === item.variantId,
    );

    if (existingItem) {
      existingItem.increaseQuantity(item.quantity);
      return;
    }

    this._items.push(item);
  }

  removeItem(productId: string): void {
    this._items = this._items.filter(
      (item) => item.productId !== productId,
    );
  }

  changeItemQuantity(
    productId: string,
    quantity: number,
  ): void {
    const item = this._items.find(
      (item) => item.productId === productId,
    );

    if (!item) {
      throw new Error("Item not found in cart");
    }

    item.changeQuantity(quantity);
  }

  clear(): void {
    this._items = [];
  }

  hasProduct(productId: string): boolean {
    return this._items.some(
      (item) => item.productId === productId,
    );
  }

  get totalItems(): number {
    return this._items.reduce(
      (total, item) => total + item.quantity,
      0,
    );
  }
}