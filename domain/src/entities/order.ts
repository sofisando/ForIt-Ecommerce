import { Entity } from "../utils/types/entity.js";
// ------------
// “Snapshot” del descuento en el momento del checkout
interface DiscountInCart {
  id: string;
  name: string;
  type: string;
  value: number;
}
// “Snapshot” de la variante en el momento del checkout
interface VariantInCart {
  id: string;
  attribute: {
    title: string; // "Color" | "Tamaño" | "Material"
    name: string; // "Rojo" | "S" | "Cuero"
    value: string | null; // "#ff0000" | URL de imagen | null
  };
}
// “Snapshot” del producto en el momento del checkout
export interface ProductInOrder {
  productId: string;
  name: string;
  price: number;
  variant: VariantInCart | undefined;
  discountApplied: DiscountInCart | undefined;
  quantity: number;
  subtotal: number;
}
//-----------

export const OrderState = {
  PENDING: "pending",
  ACCEPTED: "accepted",
  READY: "ready",
  CANCELED: "canceled",
  DELIVERED: "delivered",
} as const;

export type OrderState =
  typeof OrderState[keyof typeof OrderState];

export class Order extends Entity {
  constructor(params: {
    id: string;
    userId: string;
    products: ProductInOrder[];
    branchId: string | null;
    total: number;
    state: OrderState;
    date: Date;
  }) {
    super(params.id);

    if (params.products.length === 0) {
      throw new Error("Order must have at least one product");
    }

    this.userId = params.userId;
    this.products = params.products;
    this.branchId = params.branchId;
    this.total = params.total;
    this.state = params.state;
    this.date = params.date;
  }

  public readonly userId: string;
  public readonly products: ProductInOrder[];
  public readonly branchId: string | null;
  public readonly total: number;
  public state: OrderState;
  public readonly date: Date;

  cancel() {
    if (this.state === OrderState.DELIVERED) {
      throw new Error("Delivered orders cannot be canceled");
    }
    this.state = OrderState.CANCELED;
  }
}

