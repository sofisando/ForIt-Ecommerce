import { Discount } from "../../entities/discount.js";
import { CreatePayload, UpdatePayload } from "../../utils/index.js";
import { DiscountService } from "../discount-service.js";

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
  editOne = async (data: UpdatePayload<Discount>): Promise<Discount> => {
    const index = this.discounts.findIndex(
      (discount) => discount.id === data.id
    );
    if (index === -1) throw Error("Discount not found");

    const edited = { ...this.discounts[index], ...data } as Discount;
    this.discounts[index] = edited;
    return edited;
  };
  create = async (data: CreatePayload<Discount>): Promise<Discount> => {
    const newDiscount = {
      ...data,
      id: crypto.randomUUID(), //esto simula cuando la db crea el id
    } satisfies Discount;

    this.discounts.push(newDiscount);
    return newDiscount;
  };
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
