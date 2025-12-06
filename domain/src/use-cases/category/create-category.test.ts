import { describe, expect, test } from "vitest";
import { MockedCategoryService } from "../../services/mocks/mock-category-service";
import { categoryMock } from "../../entities/mocks/category-mock";
import { createCategory } from "./create-category";
import { MockedUserService } from "../../services/mocks/mock-user-service";
import { userMock } from "../../entities/mocks/user-mock";

describe("createCategory", async () => {
  const categoryService = new MockedCategoryService([categoryMock()]);
  const userService = new MockedUserService([
    userMock({ id: "user-1", role: "ADMIN" }),
    userMock({ id: "user-2", role: "CLIENT" }),
  ]);
  test("should create a new category", async () => {
    await createCategory(
      { categoryService, userService },
      {
        userId: "user-1",
        data: {
          name: "Tecnología",
        },
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
      { categoryService, userService },
      {
        userId: "user-1",
        data: {
          name: "Tecnología",
        },
      }
    );
    expect(result).toStrictEqual(Error("Name Tecnología is already created"));
  });

  test("Should return error if user not found", async () => {
    const result = await createCategory(
      { categoryService, userService },
      {
        userId: "user-999",
        data: {
          name: "Hogar",
        },
      }
    );
    expect(result).toStrictEqual(Error("User user-999 not found"));
  });

  test("Should return error if user is not ADMIN", async () => {
    const result = await createCategory(
      { categoryService, userService },
      {
        userId: "user-2",
        data: {
          name: "Hogar",
        },
      }
    );
    expect(result).toStrictEqual(Error("User is not ADMIN"));
  });
});
