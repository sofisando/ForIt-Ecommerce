import {
  AuthenticatedUser,
  ProductNotFoundError,
  UnauthorizedError,
  UserRole,
  type ProductRepository,
} from "@forit/domain";
import { DeleteProductDTO } from "@app/DTOs/index.js";

interface DeleteProductDeps {
  productRepository: ProductRepository;
}
interface DeleteProductPayload {
  actor: AuthenticatedUser;
  dto: DeleteProductDTO;
}

export async function deleteProduct(
  { productRepository }: DeleteProductDeps,
  { actor, dto }: DeleteProductPayload,
): Promise<void> {
  if (actor.role !== UserRole.ADMIN) {
    throw new UnauthorizedError();
  }

  const product = await productRepository.getById(dto.id);
  if (!product) {
    throw new ProductNotFoundError();
  }

  await productRepository.delete(dto.id);
}
