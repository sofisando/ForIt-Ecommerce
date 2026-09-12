import { Discount } from "@forit/domain";
import { DiscountInCartDTO } from "src/https/dtos/cart/discount-in-cart.dto.js";

export function toDiscountInCartDTO(
  discount: Discount | undefined
): DiscountInCartDTO | undefined {
  if (!discount) return undefined;

  return {
    id: discount.id,
    name: discount.name,
    type: discount.type,
    value: discount.value,
  };
}
