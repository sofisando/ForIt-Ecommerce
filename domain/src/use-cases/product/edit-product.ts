import { Product } from "../../entities";
import { MockedProductService } from "../../services/mocks/mock-product-service";
import { UpdatePayload } from "../../utils/types/payload";

interface EditProductDeps {
  productService: MockedProductService;
}

type EditProductPayload = UpdatePayload<Product>

export async function editProduct(
  { productService }: EditProductDeps,
  { id, ...data }: EditProductPayload
): Promise<Product> {
  const findProduct = await productService.findById(id);
  if (!findProduct) throw new Error("Product not found");
  const editedProduct = await productService.editOne(id, data);

  return editedProduct;
}