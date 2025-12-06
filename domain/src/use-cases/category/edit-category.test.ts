import { describe, expect, test } from "vitest";
import { MockedCategoryService } from "../../services/mocks/mock-category-service";
import { categoryMock } from "../../entities/mocks/category-mock";
import { editCategory } from "./edit-category";
import { MockedUserService } from "../../services/mocks/mock-user-service";
import { userMock } from "../../entities/mocks/user-mock";

describe("editCategory", async () => {
  const categoryService = new MockedCategoryService([
    categoryMock({
      id: "1",
      name: "Tecnología"
    }),
  ]);
    const userService = new MockedUserService([
    userMock({ id: "user-1", role: "ADMIN" }),
    userMock({ id: "user-2", role: "CLIENT" }),
  ]);

  test("When edit a category you should update info category", async () => {
    const result = await editCategory(
      { categoryService, userService },
      { userId: "user-1",
        data: { id: "1", name: "Mouse"}
      }
    );

    expect(result).toStrictEqual({
      id: "1",
      name: "Mouse"
    });
  });

  test("Should return error if category not found", async () => {
    const result = await editCategory(
      { categoryService, userService },
      { userId: "user-1",
        data: { id: "999", name: "Mouse"}
      }
    );
    expect(result).toStrictEqual(Error("Category not found"))
  });

  test("Should return error if user not found", async () => {
    const result = await editCategory(
      { categoryService, userService },
      { userId: "user-999",
        data: { id: "1", name: "Mouse"}
      }
    );
    expect(result).toStrictEqual(Error("User user-999 not found"))
  });

   test("Should return error if user is not ADMIN", async () => {
    const result = await editCategory(
      { categoryService, userService },
      { userId: "user-2",
        data: { id: "1", name: "Mouse"}
      }
    );
    expect(result).toStrictEqual(Error("User is not ADMIN"))
  });
}); 
