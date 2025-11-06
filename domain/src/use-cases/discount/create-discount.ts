import { Discount } from "../../entities/discount.js";
import { DiscountService } from "../../services/discount-service.js";
import type { CreatePayload } from "../../utils/types/payload.js";

interface CreateDiscountDeps {
  discountService: DiscountService;
}

type CreateDiscountPayload = CreatePayload<Discount>;

export async function createDiscount(
  { discountService }: CreateDiscountDeps,
  payload: CreateDiscountPayload
): Promise<Discount | Error> {
  const foundDiscountName = await discountService.findByName(payload.name);
  if (foundDiscountName)
    return new Error(`Name ${payload.name} is already created`);

  const discount = await discountService.create(payload);

  return discount;
}
