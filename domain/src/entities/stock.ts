import { Entity } from "../utils/types/entity";

export class Stock extends Entity {
  private constructor(
    id: string,
    public readonly branchId: string | null,
    public readonly quantity: number,
    public readonly productId?: string,
    public readonly variantId?: string,
  ) {
    super(id);

    if (quantity < 0) {
      throw new Error("Stock quantity cannot be negative");
    }
  }

  static forProduct(params: {
    id: string;
    productId: string;
    branchId: string | null;
    quantity: number;
  }): Stock {
    return new Stock(
      params.id,
      params.branchId,
      params.quantity,
      params.productId,
      undefined
    );
  }

  static forVariant(params: {
    id: string;
    variantId: string;
    branchId: string | null;
    quantity: number;
  }): Stock {
    return new Stock(
      params.id,
      params.branchId,
      params.quantity,
      undefined,
      params.variantId
    );
  }
}
