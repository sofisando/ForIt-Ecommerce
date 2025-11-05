import { Product } from "../../entities";
import { ProductService } from "../../services";
import { CreatePayload } from "../../utils/types/payload";

interface CreateProductDeps {
  productService: ProductService;
}

type CreateProductPayload = CreatePayload<Product>

export async function createProduct(
  { productService }: CreateProductDeps,
  payload: CreateProductPayload
): Promise<Product> {
  const product = await productService.create({
    id: crypto.randomUUID(), //esto simula cuando la db genera el id
    ...payload,
  });

  return product;
}
