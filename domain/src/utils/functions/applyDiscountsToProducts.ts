import { Discount, DiscountInCart } from "../../entities";
import { DiscountService } from "../../services";

interface ApplyDiscountsDeps {
  discountService: DiscountService;
}

type BaseProductForDiscount = {
  categoryId: string;
  id?: string;
  productId?: string;
};

// Enriquecer el tipo con discountApplied
export type WithDiscountApplied<P extends BaseProductForDiscount> = P & {
  discountApplied: DiscountInCart | undefined;
};

function matchDiscount(
  product: BaseProductForDiscount,
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

// 🔹 Overloads
export function applyDiscountsToProducts<P extends BaseProductForDiscount>(
  deps: ApplyDiscountsDeps,
  products: P
): Promise<WithDiscountApplied<P>>;

export function applyDiscountsToProducts<P extends BaseProductForDiscount>(
  deps: ApplyDiscountsDeps,
  products: P[]
): Promise<WithDiscountApplied<P>[]>;

// 🔹 Implementación
export async function applyDiscountsToProducts<P extends BaseProductForDiscount>(
  { discountService }: ApplyDiscountsDeps,
  products: P | P[]
): Promise<WithDiscountApplied<P> | WithDiscountApplied<P>[]> {
  const list = Array.isArray(products) ? products : [products];

  const activeDiscounts = await discountService.getActiveDiscounts();

  const enriched = list.map((p) => ({
    ...p,
    discountApplied: matchDiscount(p, activeDiscounts),
  })) as WithDiscountApplied<P>[];

  return Array.isArray(products) ? enriched : enriched[0] as any;
}
