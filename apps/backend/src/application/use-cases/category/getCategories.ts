import { Prisma } from "@infra/generated/prisma/client.js";
import { GetCategoryDTO } from "@app/DTOs/index.js";
import type { CategoryRepository } from "@forit/domain";

interface GetCategoriesDeps {
  categoryRepository: CategoryRepository;
}

export async function getCategories(
  {
    categoryRepository,
  }: GetCategoriesDeps,
  dto: GetCategoryDTO,
) {
  const filters: Prisma.CategoryWhereInput = {};

  if (dto.search) { //tengo la sospecha que esto no funiona
    filters.name = {
      contains: dto.search,
      mode: "insensitive",
    };
  }

  const categories = await categoryRepository.getAll(filters);

  return categories;
}
