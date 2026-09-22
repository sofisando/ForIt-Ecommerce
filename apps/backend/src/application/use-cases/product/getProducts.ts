//import { DiscountService, ProductService } from "../../services";
//import { applyDiscountsToProducts } from "../../utils/functions/applyDiscountsToProducts";
import { Prisma } from "@infra/generated/prisma/client.js";
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
  const filters: Prisma.ProductWhereInput = {};

  if (dto.search) {
    filters.OR = [
      {
        name: {
          contains: dto.search,
          mode: "insensitive",
        },
      },
      {
        description: {
          contains: dto.search,
          mode: "insensitive",
        },
      },
    ];
  }

  if (dto.categoryId) {
    filters.categoryId = dto.categoryId;
  }

  if (dto.minPrice !== undefined || dto.maxPrice !== undefined) {
    filters.price = {};

    if (dto.minPrice !== undefined) {
      filters.price.gte = dto.minPrice;
    }

    if (dto.maxPrice !== undefined) {
      filters.price.lte = dto.maxPrice;
    }
  }

  const products = await productRepository.getAll(filters);

  //no poner errores cuando no existe la categoria, que devuelva []

  //   const productsWithDiscounts = applyDiscountsToProducts(
  //     { discountService },
  //     products
  //   );
  return products;
}
