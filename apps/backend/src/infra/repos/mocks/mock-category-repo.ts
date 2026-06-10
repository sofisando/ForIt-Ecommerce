import { Category, CategoryRepository } from "@forit/domain";

export class MockedCategoryRepository implements CategoryRepository {
  categories: Category[] = [];

  constructor(categories: Category[]) {
    this.categories = categories;
  }

  getById = async (id: string): Promise<Category | null> => {
    return this.categories.find((category) => category.id == id) ?? null;
  };
  getAll = async (): Promise<Category[]> => {
    return this.categories;
  };

  async save(category: Category): Promise<void> {
    const index = this.categories.findIndex((c) => c.id === category.id);

    if (index === -1) {
      this.categories.push(category);
    } else {
      this.categories[index] = category;
    }
  }

  delete = async (id: String): Promise<void> => {
    this.categories = this.categories.filter((u) => u.id !== id);
  };
  findByName = async (name: string): Promise<Category | undefined> => {
    return this.categories.find((category) => category.name == name);
  };
}
