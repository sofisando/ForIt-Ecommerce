import { Category } from "../../entities/category";
import { CategoryService } from "../../services/category-service";
import { UpdatePayload } from "../../utils/types/payload";

interface EditCategoryDeps {
  categoryService: CategoryService;
}

type EditCategoryPayload = UpdatePayload<Category>;

export async function editCategory(
  { categoryService }: EditCategoryDeps,
  payload: EditCategoryPayload
): Promise<Category> {
  const existing = await categoryService.findById(payload.id);
  if (!existing) throw new Error("Category not found");

  const updated = await categoryService.editOne(payload);
  return updated;
}
