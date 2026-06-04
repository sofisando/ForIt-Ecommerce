import { Category } from "../entities/category.js";
import type { Repository } from "../utils/types/repository.js";

export interface CategoryRepository extends Repository<Category> {
  findByName: (name: string) => Promise<Category | undefined>;
}
