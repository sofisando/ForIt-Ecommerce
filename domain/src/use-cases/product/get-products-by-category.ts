import { Product } from "../../entities";
import { ProductService } from "../../services";

interface GetProductsByCategoryDeps {
  productService: ProductService;
}

interface GetProductsByCategoryPayload {
  categoryId: string;
}

export async function getProductsByCategory(
  { productService }: GetProductsByCategoryDeps,
  { categoryId }: GetProductsByCategoryPayload
): Promise<Product[]> {
  const filteredProducts = await productService.getProductsByCategory(categoryId);

  return filteredProducts;
}
