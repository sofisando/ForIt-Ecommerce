import type { Product } from "../../entities";
import { MockedProductService } from "../../services/mocks/mock-product-service";

interface GetProductsSearchDeps {
  productService: MockedProductService;
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
