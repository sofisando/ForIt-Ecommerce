
import { Category } from "../../entities/category.js";
import { CreatePayload, UpdatePayload } from "../../utils/index.js";
import { CategoryService } from "../category-service.js";

export class MockedCategoryService implements CategoryService {
  categories: Category[] = [];

  constructor(categories: Category[]) {
    this.categories = categories;
  }

  findById = async (id: string): Promise<Category | null> => {
    return this.categories.find((category) => category.id == id) ?? null;
  };
  findAll = async (): Promise<Category[]> => {
    return this.categories;
  };
  editOne = async (data: UpdatePayload<Category>): Promise<Category> => {
    const index = this.categories.findIndex((category) => category.id === data.id);
    if (index === -1) throw Error("Category not found");

    const edited = { ...this.categories[index], ...data } as Category;
    this.categories[index] = edited;
    return edited;
  };
  create = async (data: CreatePayload<Category>): Promise<Category> => {
    const newCategory = {
      ...data,
      id: crypto.randomUUID(), //esto simula cuando la db crea el id
    } satisfies Category;

    this.categories.push(newCategory);
    return newCategory;
  };
  delete = async (data: {id: String}): Promise<void> => {
    this.categories = this.categories.filter((u) => u.id !== data.id);
  };
  findByName = async (name: string): Promise<Category | undefined> => {
    return this.categories.find((category) => category.name == name);
  };
}
