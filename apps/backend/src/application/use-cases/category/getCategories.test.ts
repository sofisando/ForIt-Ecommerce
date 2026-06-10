import { categoryMock } from "@forit/domain";
import { MockedCategoryRepository } from "@infra/repos/mocks/mock-category-repo.js";
import { describe, test, expect} from "vitest";
import { getCategories } from "./getCategories.js";

describe("getCategories", async() => {
    test("Should return a array of categories", async () => {
        const categoryRepository = new MockedCategoryRepository([
            categoryMock(),
            categoryMock()
        ])
        const result = await getCategories(
            { categoryRepository }, {}
        );
        expect(result).toHaveLength(2);
        expect(result).toStrictEqual(categoryRepository.categories);
    });
    test("if there are no categories you should return an empty list", async () => {;
        const categoryRepository = new MockedCategoryRepository([])
        const result = await getCategories(
            { categoryRepository }, {}
        );
        expect(result).toHaveLength(0);
        expect(result).toStrictEqual([]);
    });
});