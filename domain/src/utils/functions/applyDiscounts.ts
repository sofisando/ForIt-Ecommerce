import { Discount } from "../../entities";
import { DiscountService } from "../../repos";

interface ApplyDiscountsDeps {
  discountService: DiscountService;
}

/**
 * Lo único que el dominio necesita:
 * poder obtener productId y categoryId
 */
export interface DiscountTarget {
  getProductId(): string;
  getCategoryId(): string;
}

export type WithDiscount<T> = T & {
  discount?: Discount;
};

export async function applyDiscounts<T extends DiscountTarget>(
  { discountService }: ApplyDiscountsDeps,
  targets: T | T[]
): Promise<WithDiscount<T> | WithDiscount<T>[]> {
  const list = Array.isArray(targets) ? targets : [targets];
  const discounts = await discountService.getActiveDiscounts();

  const enriched = list.map(t => {
    const productId = t.getProductId();
    const categoryId = t.getCategoryId();

    const discount = discounts.find(
      d =>
        d.productsApplied?.includes(productId) ||
        d.categoriesApplied?.includes(categoryId)
    );

    return { ...t, discount };
  });

  return Array.isArray(targets) ? enriched : enriched[0]!;
}
