import { Discount } from "../../entities";
import { DiscountService } from "../../services";

interface GetActiveDiscountsDeps {
  discountService: DiscountService;
}

export async function getActiveDiscounts(
  { discountService }: GetActiveDiscountsDeps
): Promise<Discount[]> {
  const allDiscounts = await discountService.findAll();
  const filteredDiscounts = allDiscounts.filter(
    (discount) => discount.active === true
  );

  return filteredDiscounts;
}