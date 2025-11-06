import { describe, expect, test } from "vitest";
import { MockedCategoryService } from "../../services/mocks/mock-category-service";
import { categoryMock } from "../../entities/mocks/category-mock";
import { createCategory } from "./create-category";

describe("createCategory", async () => {
  const categoryService = new MockedCategoryService([categoryMock()]);

  test("should create a new category", async () => {
    await createCategory(
      { categoryService },
      {
        name: "Tecnología",
      }
    );

    expect(categoryService.categories).toHaveLength(2);
    expect(categoryService.categories[1]).toStrictEqual({
      id: expect.any(String),
      name: "Tecnología",
    });
  });

  test("If the name is already registered it should return an error.", async () => {
    const result = await createCategory(
      { categoryService },
      {
        name: "Tecnología",
      }
    );

    expect(result).toBeInstanceOf(Error);
  });
});
