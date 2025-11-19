import { Discount, DiscountInCart } from "../../entities";
import { DiscountService } from "../../services";

interface ApplyDiscountsDeps {
  discountService: DiscountService;
}

export type WithDiscountApplied<T> = T & {
  discountApplied: DiscountInCart | undefined;
};

function matchDiscount(
  product: { id?: string; productId?: string; categoryId: string },
  discounts: Discount[]
): DiscountInCart | undefined {
  const targetId = product.id ?? product.productId;

  const found = discounts.find(
    (d) =>
      d.productsApplied?.includes(targetId!) ||
      d.categoriesApplied?.includes(product.categoryId)
  );

  if (!found) return undefined;

  return {
    id: found.id,
    name: found.name,
    type: found.type,
    value: found.value,
  };
}

/**
 * Ahora funciona tanto para Product como para ProductInCart.
 */
export async function applyDiscountsToProducts<
  P extends { categoryId: string; id?: string; productId?: string }
>(
  { discountService }: ApplyDiscountsDeps,
  products: P | P[]
): Promise<WithDiscountApplied<P>[] | WithDiscountApplied<P>> {
  const list = Array.isArray(products) ? products : [products];

  const activeDiscounts = await discountService.getActiveDiscounts();

  const enriched = list.map((p) => ({
    ...p,
    discountApplied: matchDiscount(p, activeDiscounts),
  }));

  return (Array.isArray(products) ? enriched : enriched[0]) as any;
}
