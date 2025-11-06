import { describe, test, expect } from "vitest";
import { MockedCategoryService } from "../../services/mocks/mock-category-service";
import { categoryMock } from "../../entities/mocks/category-mock";
import { deleteCategory } from "./delete-category";

describe("deleteCategory", async () => {
  test("Should delete category", async () => {
    const categoryService = new MockedCategoryService([
      categoryMock({ id: "1" }),
      categoryMock({ id: "2" }),
    ]);
    const result = await deleteCategory({ categoryService }, { id: "1" });
    expect(result).toBeUndefined();

    const categories = await categoryService.findAll();
    expect(categories).toHaveLength(1);
  });
  test("Should throw if category not found", async () => {
    const categoryService = new MockedCategoryService([]);
    await expect(() =>
      deleteCategory({ categoryService }, { id: "1" })
    ).rejects.toThrow("Category not found");
  });
});
