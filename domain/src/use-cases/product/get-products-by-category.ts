import { Product } from "../../entities";
import { MockedProductService } from "../../services/mocks/mock-product-service";

interface GetProductsByCategoryDeps {
  productService: MockedProductService;
}

interface GetProductsByCategoryPayload {
  categoryId: string;
}

export async function getProductsByCategory(
  { productService }: GetProductsByCategoryDeps,
  { categoryId }: GetProductsByCategoryPayload
): Promise<Product[]> {
  const allProducts = await productService.findAll();
  const filteredProducts = allProducts.filter(
    (product) => product.categoryId === categoryId
  );

  return filteredProducts;
}
