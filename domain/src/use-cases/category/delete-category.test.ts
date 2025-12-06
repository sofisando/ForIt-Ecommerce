import { describe, test, expect } from "vitest";
import { MockedCategoryService } from "../../services/mocks/mock-category-service";
import { categoryMock } from "../../entities/mocks/category-mock";
import { deleteCategory } from "./delete-category";
import { userMock } from "../../entities/mocks/user-mock";
import { MockedUserService } from "../../services/mocks/mock-user-service";

describe("deleteCategory", async () => {
  const categoryService = new MockedCategoryService([
    categoryMock({ id: "1" }),
    categoryMock({ id: "2" }),
  ]);
  const userService = new MockedUserService([
    userMock({ id: "user-1", role: "ADMIN" }),
    userMock({ id: "user-2", role: "CLIENT" }),
  ]);
  test("Should delete category", async () => {
    const result = await deleteCategory(
      { categoryService, userService },
      { id: "1", userId: "user-1" }
    );
    expect(result).toBeUndefined();

    const categories = await categoryService.findAll();
    expect(categories).toHaveLength(1);
  });
  test("Should return error if category not found", async () => {
    const result = await deleteCategory(
      { categoryService, userService },
      { id: "999", userId: "user-1" }
    );
    expect(result).toStrictEqual(Error("Category not found"));
  });

  test("Should return error if user not found", async () => {
    const result = await deleteCategory(
      { categoryService, userService },
      { id: "2", userId: "user-999" }
    );
    expect(result).toStrictEqual(Error("User user-999 not found"));
  });
  
  test("Should return error if user is not ADMIN", async () => {
    const result = await deleteCategory(
      { categoryService, userService },
      { id: "2", userId: "user-2" }
    );
    expect(result).toStrictEqual(Error("User is not ADMIN"));
  });
});
