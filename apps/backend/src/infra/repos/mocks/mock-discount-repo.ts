import { Discount } from "@forit/domain/src/entities/discount.js";
import { DiscountService } from "@forit/domain/src/repos/discount-repository.js";

export class MockedDiscountService implements DiscountService {
  discounts: Discount[] = [];

  constructor(discounts: Discount[]) {
    this.discounts = discounts;
  }

  findById = async (id: string): Promise<Discount | null> => {
    return this.discounts.find((discount) => discount.id == id) ?? null;
  };
  findAll = async (): Promise<Discount[]> => {
    return this.discounts;
  };
  async save(discount: Discount): Promise<void> {
    const index = this.discounts.findIndex((d) => d.id === discount.id);

    if (index === -1) {
      this.discounts.push(discount);
    } else {
      this.discounts[index] = discount;
    }
  }
  delete = async (data: { id: String }): Promise<void> => {
    this.discounts = this.discounts.filter((u) => u.id !== data.id);
  };
  findByName = async (name: string): Promise<Discount | undefined> => {
    return this.discounts.find((discount) => discount.name == name);
  };
  getActiveDiscounts = async (): Promise<Discount[]> => {
    return this.discounts.filter((discount) => discount.active === true);
  };
}
