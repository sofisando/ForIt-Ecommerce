import { categoryMock, CategoryNotFoundError, UnauthorizedError, UserRole } from "@forit/domain";
import { MockedCategoryRepository } from "@infra/repos/mocks/index.js";
import { describe, expect, test } from "vitest";
import { updateCategory } from "./updateCategory.js";

describe("updateCategory", async () => {
  const categoryRepository = new MockedCategoryRepository([
    categoryMock({
      id: "1",
      name: "Tecnología",
    }),
  ]);

  test("When edit a category you should update info category", async () => {
    const result = await updateCategory(
      { categoryRepository },
      {
        actor: { userId: "user-1", role: UserRole.ADMIN },
        id: "1",
        dto: { name: "Mouse" },
      },
    );
    expect(categoryRepository.categories).toHaveLength(1);
    expect(result.name).toBe("Mouse");
  });

  test("Should return error if category not found", async () => {
    await expect(
      updateCategory(
        { categoryRepository },
        {
          actor: { userId: "user-1", role: UserRole.ADMIN },
          id: "999",
          dto: { name: "Mouse" },
        },
      ),
    ).rejects.toThrow(CategoryNotFoundError);
  });
  test("Should return error if user is not ADMIN", async () => {
    await expect(
      updateCategory(
        { categoryRepository },
        {
          actor: { userId: "user-1", role: UserRole.CLIENT },
          id: "1",
          dto: { name: "Mouse" },
        },
      ),
    ).rejects.toThrow(UnauthorizedError);
  });
});
