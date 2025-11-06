import type { Product } from "../../entities";
import { ProductService } from "../../services";

interface GetProductsSearchDeps {
  productService: ProductService;
}

interface GetProductsSearchPayload {
  query: string;
}

export async function getProductsSearch(
  { productService }: GetProductsSearchDeps,
  { query }: GetProductsSearchPayload
): Promise<Product[]> {
  const products = await productService.getProductsSearch(query);
  return products;
}
