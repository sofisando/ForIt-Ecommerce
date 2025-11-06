import { Product } from "../../entities";
import { ProductService } from "../../services";
import { UpdatePayload } from "../../utils/types/payload";

interface EditProductDeps {
  productService: ProductService;
}

type EditProductPayload = UpdatePayload<Product>;

export async function editProduct(
  { productService }: EditProductDeps,
  payload: EditProductPayload
): Promise<Product> {
  const existing = await productService.findById(payload.id);
  if (!existing) throw new Error("Product not found");

  const updated = await productService.editOne(payload);
  return updated;
}
