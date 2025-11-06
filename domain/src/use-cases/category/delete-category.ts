import { Category } from "../../entities/category";
import { CategoryService } from "../../services/category-service";
import { DeletePayload } from "../../utils/types/payload";

interface DeleteCategoryDeps {
  categoryService: CategoryService;
}

type DeleteCategoryPayload = DeletePayload<Category>

export async function deleteCategory(
  { categoryService }: DeleteCategoryDeps,
  { id }: DeleteCategoryPayload
) : Promise<void> {
  const foundCategory = await categoryService.findById(id);
  if (!foundCategory) throw new Error("Category not found");

  await categoryService.delete({id});
}