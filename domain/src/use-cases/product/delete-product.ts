import { Product } from "../../entities";
import { ProductService } from "../../services";
import { DeletePayload } from "../../utils/types/payload";

interface DeleteProductDeps {
  productService: ProductService;
}

type DeleteProductPayload = DeletePayload<Product>

export async function deleteProduct(
  { productService }: DeleteProductDeps,
  { id }: DeleteProductPayload
) : Promise<void> {
  const foundProduct = await productService.findById(id);
  if (!foundProduct) throw new Error("Product not found");

  await productService.delete({id});
}