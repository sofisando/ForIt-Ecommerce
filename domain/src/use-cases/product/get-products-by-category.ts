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
  const allProducts = await productService.findAll();
  const filteredProducts = allProducts.filter(
    (product) => product.categoryId === categoryId
  );

  return filteredProducts;
}
