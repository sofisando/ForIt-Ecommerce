import {
  CategoryAlreadyExistsError,
  categoryMock,
  UnauthorizedError,
  UserRole,
} from "@forit/domain";
import { MockedCategoryRepository } from "@infra/repos/mocks/index.js";
import { describe, expect, test } from "vitest";
import { createCategory } from "./createCategory.js";

describe("createCategory", async () => {
  test("should create a new category", async () => {
    const categoryRepository = new MockedCategoryRepository([]);
    const result = await createCategory(
      { categoryRepository },
      {
        actor: { userId: "user-1", role: UserRole.ADMIN },
        dto: {
          name: "Tecnología",
        },
      },
    );

    expect(categoryRepository.categories).toHaveLength(1);
    expect(result).toBe(categoryRepository.categories[0]);
    expect(result.name).toBe("Tecnología");
  });

  test("If the name of category is already exist it should return an error.", async () => {
    const categoryRepository = new MockedCategoryRepository([
      categoryMock({ name: "Tecnología" }),
    ]);
    await expect(
      createCategory(
        { categoryRepository },
        {
          actor: { userId: "user-1", role: UserRole.ADMIN },
          dto: {
            name: "Tecnología",
          },
        },
      ),
    ).rejects.toThrow(CategoryAlreadyExistsError);
  });

  test("Should return error if user is not ADMIN", async () => {
    const categoryRepository = new MockedCategoryRepository([]);
    await expect(
      createCategory(
        { categoryRepository },
        {
          actor: { userId: "user-1", role: UserRole.CLIENT },
          dto: {
            name: "Hogar",
          },
        },
      ),
    ).rejects.toThrow(UnauthorizedError);
  });
});
