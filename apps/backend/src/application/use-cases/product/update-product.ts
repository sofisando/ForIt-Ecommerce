import { UpdateProductDTO } from "@app/DTOs/index.js";
import {
  AuthenticatedUser,
  Product,
  ProductNotFoundError,
  UnauthorizedError,
  UserRole,
} from "@forit/domain";
import { Money } from "@forit/domain/dist/ValueObjects/Money.js";
import { ProductRepository } from "@forit/domain";

interface UpdateProductDeps {
  productRepository: ProductRepository;
}
interface UpdateProductPayload {
  actor: AuthenticatedUser;
  id: string;
  dto: UpdateProductDTO;
}

export async function updateProduct(
  { productRepository }: UpdateProductDeps,
  { actor, id, dto }: UpdateProductPayload,
): Promise<Product> {
  if (actor.role !== UserRole.ADMIN) {
    throw new UnauthorizedError();
  }

  const product = await productRepository.getById(id);
  if (!product) {
    throw new ProductNotFoundError();
  }

  if (dto.name !== undefined) {
    product.changeName(dto.name);
  }

  if (dto.description !== undefined) {
    product.changeDescription(dto.description);
  }

  if (dto.imageUrl !== undefined) {
    product.changeImageUrl(dto.imageUrl);
  }

  if (dto.price !== undefined) {
    product.changePrice(new Money(dto.price));
  }
  if (dto.categoryId !== undefined) {
    product.changeCategory(dto.categoryId);
  }

  await productRepository.save(product);

  return product;
}
