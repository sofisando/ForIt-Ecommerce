import { UpdateCategoryDTO } from "@app/DTOs/index.js";
import {
  AuthenticatedUser,
  Category,
  CategoryNotFoundError,
  CategoryRepository,
  UnauthorizedError,
  UserRole,
} from "@forit/domain";

interface UpdateCategoryDeps {
  categoryRepository: CategoryRepository;
}
type UpdateCategoryPayload = {
  actor: AuthenticatedUser;
  id: string; // lo pongo acá porque viene desde la url
  dto: UpdateCategoryDTO;
};

export async function updateCategory(
  { categoryRepository }: UpdateCategoryDeps,
  { actor, id, dto }: UpdateCategoryPayload,
): Promise<Category> {
  if (actor.role !== UserRole.ADMIN) {
    throw new UnauthorizedError();
  }

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
