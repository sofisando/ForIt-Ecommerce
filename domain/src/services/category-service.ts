import { Category } from "../entities/category.js";
import type { Service } from "../utils/types/service.js";

export interface CategoryService extends Service<Category> {
  findByName: (name: string) => Promise<Category | undefined>;
}
