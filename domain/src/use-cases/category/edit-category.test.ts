import { describe, expect, test } from "vitest";
import { MockedCategoryService } from "../../services/mocks/mock-category-service";
import { categoryMock } from "../../entities/mocks/category-mock";
import { editCategory } from "./edit-category";

describe("editCategory", async () => {
  const categoryService = new MockedCategoryService([
    categoryMock({
      id: "1",
      name: "Tecnología"
    }),
  ]);

  test("When edit a category you should update info category", async () => {
    const result = await editCategory(
      { categoryService },
      { id: "1", name: "Mouse"}
    );

    expect(result).toStrictEqual({
      id: "1",
      name: "Mouse"
    });
  });

  test("Should throw if category not found", async () => {
    await expect(
      editCategory({ categoryService }, { id: "999" })
    ).rejects.toThrow("Category not found");
  });
});
