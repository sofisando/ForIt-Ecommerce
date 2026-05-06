//import { DiscountService, ProductService } from "../../services";
//import { applyDiscountsToProducts } from "../../utils/functions/applyDiscountsToProducts";
import type { ProductRepository } from "@forit/domain";

interface GetAllProductsDeps {
  productRepository: ProductRepository;
//   discountService: DiscountService;
}

export async function getAllProducts({
  productRepository,
//   discountService,
}: GetAllProductsDeps) {
  const products = await productRepository.getAll();
//   const productsWithDiscounts = applyDiscountsToProducts(
//     { discountService },
//     products
//   );
  return products;
}
