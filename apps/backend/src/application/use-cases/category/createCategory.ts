import { CreateCategoryDTO } from "@app/DTOs/index.js";
import {
  Category,
  CategoryAlreadyExistsError,
  CategoryRepository,
} from "@forit/domain";

interface CreateCategoryDeps {
  categoryRepository: CategoryRepository;
}

interface CreateCategoryPayload {
  //   actor: AuthenticatedUser; //viene del midleware
  dto: CreateCategoryDTO;
}

export async function createCategory(
  { categoryRepository }: CreateCategoryDeps,
  { dto }: CreateCategoryPayload,
): Promise<Category> {
    
  //   if (actor.role !== UserRole.ADMIN) {
  //     throw new UnauthorizedError();
  //   }

  const existingCategory = await categoryRepository.findByName(dto.name);

  if (existingCategory) {
    throw new CategoryAlreadyExistsError(dto.name);
  }
  const category = new Category(crypto.randomUUID(), dto.name);

  await categoryRepository.save(category);

  return category;
}
