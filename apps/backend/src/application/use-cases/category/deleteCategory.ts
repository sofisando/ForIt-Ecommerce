import { CategoryNotFoundError, type CategoryRepository } from "@forit/domain";
import { DeleteCategoryDTO } from "@app/DTOs/index.js";

interface DeleteCategoryDeps {
  categoryRepository: CategoryRepository;
}

interface DeleteCategoryPayload {
  //   actor: AuthenticatedUser; //viene del midleware
  dto: DeleteCategoryDTO;
}

export async function deleteCategory(
  { categoryRepository }: DeleteCategoryDeps,
  { dto }: DeleteCategoryPayload,
): Promise<void> {

 //   if (actor.role !== UserRole.ADMIN) {
  //     throw new UnauthorizedError();
  //   }

  const category = await categoryRepository.getById(dto.id);
  if (!category) {
    throw new CategoryNotFoundError();
  }

  await categoryRepository.delete(dto.id);
}
