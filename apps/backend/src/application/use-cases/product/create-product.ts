import { UnauthorizedError, UserRole, type AuthenticatedUser, Product, type ProductRepository, Money } from "@forit/domain";
import { CreateProductDTO } from "@app/DTOs/index.js";

interface CreateProductDeps {
  productRepository: ProductRepository;
}

interface CreateProductsPayload {
  actor: AuthenticatedUser;
  dto: CreateProductDTO;
}

export async function createProduct(
  { productRepository }: CreateProductDeps,
  { actor, dto }: CreateProductsPayload
): Promise<Product> {

  if (actor.role !== UserRole.ADMIN) {
    throw new UnauthorizedError();
  }

  const product = new Product(
    crypto.randomUUID(),
    dto.name,
    dto.description,
    dto.imageUrl,
    new Money(dto.price),
    dto.categoryId
  );

  await productRepository.save(product);

  return product;
}