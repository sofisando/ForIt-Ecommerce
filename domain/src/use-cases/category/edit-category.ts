import { User, UserRole } from "../../entities";
import type { Category } from "../../entities/category";
import type { CategoryService, UserService } from "../../services";
import type { UpdatePayload } from "../../utils/types/payload";

interface EditCategoryDeps {
  categoryService: CategoryService;
  userService: UserService;
}

type EditCategoryPayload = {
  userId: User["id"];
  data: UpdatePayload<Category>;
};

export async function editCategory(
  { categoryService, userService }: EditCategoryDeps,
  { userId, data }: EditCategoryPayload
): Promise<Category | Error> {
  const user = await userService.findById(userId);
  if (!user) return new Error(`User ${userId} not found`);

  if (user.role !== UserRole.ADMIN) return new Error(`User is not ${UserRole.ADMIN}`);
  const existing = await categoryService.findById(data.id);
  if (!existing) return  new Error("Category not found");

  const updated = await categoryService.editOne(data);
  return updated;
}
