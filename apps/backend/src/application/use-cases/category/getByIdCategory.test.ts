import { categoryMock, CategoryNotFoundError } from "@forit/domain";
import { MockedCategoryRepository } from "@infra/repos/mocks/mock-category-repo.js";
import { describe, test, expect} from "vitest";
import { getCategoryById } from "./getByIdCategory.js";

describe("getCategoryById", async() => {
    test("Should return a category by id", async () => {
        const categoryRepository = new MockedCategoryRepository([
            categoryMock({ id: "1"})
        ])
        const result = await getCategoryById(
            { categoryRepository }, {id: "1"}
        );
        expect(result.id).toBe("1");
    });
    test("Should return error if category is not found", async () => {;
        const categoryRepository = new MockedCategoryRepository([])
        await expect (getCategoryById(
            { categoryRepository }, {id: "1"}
        )).rejects.toThrow(CategoryNotFoundError);
    });
});