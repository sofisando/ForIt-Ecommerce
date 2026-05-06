//import { DiscountService, ProductService } from "../../services";
//import { applyDiscountsToProducts } from "../../utils/functions/applyDiscountsToProducts";
import type { ProductRepository } from "@forit/domain";

interface GetProductListDeps {
  productRepository: ProductRepository;
//   discountService: DiscountService;
}

export async function getProductList({
  productRepository,
//   discountService,
}: GetProductListDeps) {
  const products = await productRepository.getAll();
//   const productsWithDiscounts = applyDiscountsToProducts(
//     { discountService },
//     products
//   );
  return products;
}
