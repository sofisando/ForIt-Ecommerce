import { User, UserRole } from "../../entities";
import type { Category } from "../../entities/category";
import type { CategoryService, UserService } from "../../services";
import type { DeletePayload } from "../../utils/types/payload";

interface DeleteCategoryDeps {
  categoryService: CategoryService;
  userService: UserService;
}

type DeleteCategoryPayload = DeletePayload<Category> & {
  userId: User["id"];
};

export async function deleteCategory(
  { categoryService, userService }: DeleteCategoryDeps,
  { id, userId }: DeleteCategoryPayload
): Promise<void | Error> {
  const user = await userService.findById(userId);
  if (!user) return new Error(`User ${userId} not found`);

  if (user.role !== UserRole.ADMIN) {
    return new Error(`User is not ${UserRole.ADMIN}`);
  }
  const foundCategory = await categoryService.findById(id);
  if (!foundCategory) return new Error("Category not found");

  await categoryService.delete({ id });
}
