import { MockedProductService } from "../../services/mocks/mock-product-service";

interface DeleteProductDeps {
  productService: MockedProductService;
}

interface DeleteProductPayload {
  id: string;
}
export async function deleteProduct(
  { productService }: DeleteProductDeps,
  { id }: DeleteProductPayload
) : Promise<void> {
  const foundProduct = await productService.findById(id);
  if (!foundProduct) throw new Error("Product not found");

  await productService.delete(id);
}