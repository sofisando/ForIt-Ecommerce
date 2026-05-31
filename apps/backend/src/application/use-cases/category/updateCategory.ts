import { UpdateCategoryDTO } from "@app/DTOs/index.js";
import { Category, CategoryNotFoundError, CategoryRepository } from "@forit/domain";

interface UpdateCategoryDeps {
  categoryRepository: CategoryRepository;
}

type UpdateCategoryPayload = {
  //   actor: AuthenticatedUser; //viene del midleware
  id: string; // lo pongo acá porque viene desde la url
  dto: UpdateCategoryDTO;
};

export async function updateCategory(
  { categoryRepository }: UpdateCategoryDeps,
  { id, dto }: UpdateCategoryPayload,
): Promise<Category> {
  //   if (actor.role !== UserRole.ADMIN) {
  //     throw new UnauthorizedError();
  //   }

  const category = await categoryRepository.getById(id);
  if (!category) {
      throw new CategoryNotFoundError(id);
    }

  if (dto.name !== undefined) {
    category.changeName(dto.name);
  }

  await categoryRepository.save(category);

  return category;
}
