import { UpdateCategoryDTO } from "@app/DTOs/index.js";
import { Category, CategoryNotFoundError, CategoryRepository } from "@forit/domain";

interface UpdateCategoryDeps {
  categoryRepository: CategoryRepository;
}

type UpdateCategoryPayload = {
  //   actor: AuthenticatedUser; //viene del midleware
  id: string; //lo pongo acá y no en el dto porque sino se puede llegar a cambiar el id y no quiero eso
  dto: UpdateCategoryDTO;
};

export async function updateCategory(
  { categoryRepository }: UpdateCategoryDeps,
  { id, dto }: UpdateCategoryPayload,
): Promise<Category> {
  //   if (actor.role !== UserRole.ADMIN) {
  //     throw new UnauthorizedError();
  //   }

  const existingCategory = await categoryRepository.getById(id);
  if (!existingCategory) {
      throw new CategoryNotFoundError(id);
    }

  const updatedCategory = new Category (
    id,
    dto.name
  )

  await categoryRepository.save(updatedCategory);

  return updatedCategory;
}
