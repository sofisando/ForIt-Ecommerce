// import { DiscountService, ProductService } from "../../services";
// import { applyDiscountsToProducts } from "../../utils/functions/applyDiscountsToProducts";
import { ProductNotFoundError, type ProductRepository } from "@forit/domain";
import { GetProductByIdDTO } from "./DTOs/getById-product.dto.js";

interface GetProductByIdDeps {
  productRepository: ProductRepository;
//   discountService: DiscountService;
}

export async function getProductById({
  productRepository,
//   discountService,
}: GetProductByIdDeps, dto: GetProductByIdDTO) {
  const product = await productRepository.getById(dto.id);

  if (!product) {
    throw new ProductNotFoundError();
  }

//   const productsWithDiscounts = applyDiscountsToProducts(
//     { discountService },
//     products
//   );
  return product;
}
