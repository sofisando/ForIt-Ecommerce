import { Product, Discount, DiscountInCart } from "../../entities";
import { DiscountService } from "../../services";

interface ApplyDiscountsDeps {
  discountService: DiscountService;
}

export interface ProductWithDiscountApplied extends Product {
  discountApplied: DiscountInCart | undefined;
}

function matchDiscountToProduct(
  product: Product,
  discounts: Discount[]
): DiscountInCart | undefined {
  const found = discounts.find(
    (d) =>
      d.productsApplied?.includes(product.id) ||
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
 * Toma un producto o una lista de productos y devuelve el mismo shape
 * con la propiedad `discountApplied` agregada.
 */
export async function applyDiscountsToProducts<
  P extends Product | Product[]
>(
  { discountService }: ApplyDiscountsDeps,
  products: P
): Promise<
  P extends Product[]
    ? ProductWithDiscountApplied[]
    : ProductWithDiscountApplied
> {
  const list = Array.isArray(products) ? products : [products];

  const activeDiscounts = await discountService.getActiveDiscounts();

  const enriched = list.map((p): ProductWithDiscountApplied => ({
    ...p,
    discountApplied: matchDiscountToProduct(p, activeDiscounts),
  }));

  return (Array.isArray(products) ? enriched : enriched[0]) as any;
}
