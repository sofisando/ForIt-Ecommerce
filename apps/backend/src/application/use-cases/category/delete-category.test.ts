import { categoryMock, CategoryNotFoundError, UnauthorizedError, UserRole } from "@forit/domain";
import { MockedCategoryRepository } from "@infra/repos/mocks/index.js";
import { describe, test, expect } from "vitest";
import { deleteCategory } from "./deleteCategory.js";

describe("deleteCategory", async () => {
  const categoryRepository = new MockedCategoryRepository([
    categoryMock({ id: "1" }),
    categoryMock({ id: "2" }),
  ]);
  test("Should delete category", async () => {
    const result = await deleteCategory(
      { categoryRepository },
      {
        actor: { userId: "user-1", role: UserRole.ADMIN },
        dto: {
          id: "1",
        },
      },
    );
    expect(result).toBeUndefined();

    const categories = await categoryRepository.getAll();
    expect(categories).toHaveLength(1);
  });
  test("Should return error if category not found", async () => {
    await expect (deleteCategory(
      { categoryRepository },
      {
        actor: { userId: "user-1", role: UserRole.ADMIN },
        dto: {
          id: "999",
        },
      },
    )).rejects.toThrow(CategoryNotFoundError);
  });
  test("Should return error if user is not ADMIN", async () => {
    await expect (deleteCategory(
      { categoryRepository },
      {
        actor: { userId: "user-1", role: UserRole.CLIENT },
        dto: {
          id: "1",
        },
      },
    )).rejects.toThrow(UnauthorizedError);
  });
});
