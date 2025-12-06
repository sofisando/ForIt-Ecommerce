import type { Category } from "../../entities/category.js";
import { User, UserRole } from "../../entities/user.js";
import type { CategoryService, UserService } from "../../services/index.js";
import type { CreatePayload } from "../../utils/types/payload.js";

interface CreateCategoryDeps {
  categoryService: CategoryService;
  userService: UserService;
}

type CreateCategoryPayload = {
  userId: User["id"];
  data: CreatePayload<Category>;
};

export async function createCategory(
  { categoryService, userService }: CreateCategoryDeps,
  { userId, data }: CreateCategoryPayload
): Promise<Category | Error> {
  const user = await userService.findById(userId);
  if (!user) return new Error(`User ${userId} not found`);

  if (user.role !== UserRole.ADMIN) {
    return new Error(`User is not ${UserRole.ADMIN}`);
  }
  const foundCategoryName = await categoryService.findByName(data.name);
  if (foundCategoryName) return new Error(`Name ${data.name} is already created`);

  const category = await categoryService.create(data);

  return category;
}
