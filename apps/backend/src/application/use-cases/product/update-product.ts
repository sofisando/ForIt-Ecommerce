import { UpdateProductDTO } from "@app/DTOs/index.js";
import { Product, ProductNotFoundError } from "@forit/domain";
import { Money } from "@forit/domain/dist/ValueObjects/Money.js";
import { ProductRepository } from "@forit/domain";

interface UpdateProductDeps {
  productRepository: ProductRepository;
}

export async function updateProduct(
  { productRepository }: UpdateProductDeps,
  id: string,
  dto: UpdateProductDTO
): Promise<Product> {

  const existingProduct = await productRepository.getById(id);

  if (!existingProduct) {
    throw new ProductNotFoundError();
  }

  const updatedProduct = new Product(
    id,
    dto.name,
    dto.description,
    dto.imageUrl,
    new Money(dto.price),
    dto.categoryId
  );

  await productRepository.save(updatedProduct);

  return updatedProduct;
}