import { describe, test, expect} from "vitest";
import { MockedCategoryService } from "../../services/mocks/mock-category-service";
import { categoryMock } from "../../entities/mocks/category-mock";
import { getCategoryList } from "./get-category-list";


describe("getCategoryList", async() => {
    test("Should return a array of categories", async () => {
        const categoryService = new MockedCategoryService([
            categoryMock(),
            categoryMock()
        ]) //acá ejecutamos el constructor del Mock de servicio y le metemos Mocks de usuario
        const result = await getCategoryList(
            { categoryService }
        );
        expect(result).toHaveLength(2);
        expect(result).toStrictEqual(categoryService.categories);
    });
    test("if there are no categories you should return an empty list", async () => {;
        const categoryService = new MockedCategoryService([])
        const result = await getCategoryList(
            { categoryService }
        );
        expect(result).toHaveLength(0);
        expect(result).toStrictEqual([]);
    });
});