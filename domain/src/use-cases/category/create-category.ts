import { Category } from "../../entities/category.js";
import { CategoryService } from "../../services/category-service.js";

import type { CreatePayload } from "../../utils/types/payload.js";

interface CreateCategoryDeps {
  categoryService: CategoryService;
}

type CreateCategoryPayload = CreatePayload<Category>;

export async function createCategory(
  { categoryService }: CreateCategoryDeps,
  payload: CreateCategoryPayload
): Promise<Category | Error> {
  const foundCategoryName = await categoryService.findByName(payload.name);
  if (foundCategoryName)
    return new Error(`Name ${payload.name} is already created`);

  const category = await categoryService.create(payload);

  return category;
}
