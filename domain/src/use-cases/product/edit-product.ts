import { Product, ProductUpdate } from "../../entities";
import { MockedProductService } from "../../services/mocks/mock-product-service";

interface EditProductDeps {
  productService: MockedProductService;
}
interface EditProductPayload extends ProductUpdate {
  id: string;
}

export async function editProduct(
  { productService }: EditProductDeps,
  { id, ...data }: EditProductPayload
): Promise<Product> {
  const findProduct = await productService.findById(id);
  if (!findProduct) throw new Error("Product not found");
  const editedProduct = await productService.editOne(id, data);

  return editedProduct;
}