import { GetCategoryByIdDTO } from "@app/DTOs/index.js";
import { CategoryNotFoundError, type CategoryRepository } from "@forit/domain";

interface GetCategoryByIdDeps {
  categoryRepository: CategoryRepository;
}

export async function getCategoryById({
  categoryRepository,
}: GetCategoryByIdDeps, dto: GetCategoryByIdDTO) {
  const category = await categoryRepository.getById(dto.id);

  if (!category) {
    throw new CategoryNotFoundError();
  }
  return category;
}
