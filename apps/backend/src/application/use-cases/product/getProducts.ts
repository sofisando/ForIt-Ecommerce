//import { DiscountService, ProductService } from "../../services";
//import { applyDiscountsToProducts } from "../../utils/functions/applyDiscountsToProducts";
import { GetProductsDTO } from "@app/DTOs/index.js";
import type { ProductRepository } from "@forit/domain";

interface GetProductsDeps {
  productRepository: ProductRepository;
  //   discountService: DiscountService;
}

export async function getProducts(
  {
    productRepository,
    //   discountService,
  }: GetProductsDeps,
  dto: GetProductsDTO,
) {

  const filters: any = {};

  if (dto.categoryId) {
    filters.categoryId = dto.categoryId;
  }
  const products = await productRepository.getAll(filters);

  //no poner errores cuando no existe la categoria, que devuelva []


  //   const productsWithDiscounts = applyDiscountsToProducts(
  //     { discountService },
  //     products
  //   );
  return products;
}