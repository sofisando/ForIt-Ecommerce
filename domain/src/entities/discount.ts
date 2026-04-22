import { Entity } from "../utils/types/entity";

export const DiscountType = {
  PERCENTAGE: "PERCENTAGE",
  FIXED_AMOUNT: "FIXED_AMOUNT",
} as const;

export type DiscountType =
  typeof DiscountType[keyof typeof DiscountType];

export class Discount extends Entity {
  constructor(params: {
    id: string;
    name: string;
    type: DiscountType;
    value: number;
    productsApplied: string[];
    categoriesApplied: string[];
    active: boolean;
    dateFrom: Date;
    dateTo: Date;
  }) {
    super(params.id);

    if (params.value <= 0) {
      throw new Error("Discount value must be greater than zero");
    }

    if (
      params.type === DiscountType.PERCENTAGE &&
      params.value > 100
    ) {
      throw new Error("Percentage discount cannot exceed 100%");
    }

    if (
      params.productsApplied.length === 0 &&
      params.categoriesApplied.length === 0
    ) {
      throw new Error(
        "Discount must apply to products or categories"
      );
    }

    this.name = params.name;
    this.type = params.type;
    this.value = params.value;
    this.productsApplied = params.productsApplied ?? [];
    this.categoriesApplied = params.categoriesApplied ?? [];
    this.active = params.active;
    this.dateFrom = params.dateFrom;
    this.dateTo = params.dateTo;
  }

  public readonly name: string;
  public readonly type: DiscountType;
  public readonly value: number;
  public readonly productsApplied?: string[];
  public readonly categoriesApplied?: string[];
  public active: boolean;
  public readonly dateFrom: Date;
  public readonly dateTo: Date;
}
