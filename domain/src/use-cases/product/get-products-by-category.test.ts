import { describe, test, expect} from "vitest";
import { MockedProductService } from "../../services/mocks/mock-product-service";
import { productMock } from "../../entities/mocks/product-mock";
import { getProductsByCategory } from "./get-products-by-category";


describe("getProductsByCategory", async() => {
    test("Should return a array of products filtered by category", async () => {
        const productService = new MockedProductService([
            productMock({ categoryId: "1" }),
            productMock({ categoryId: "1" }),
            productMock({ categoryId: "2" }),
        ]);
        const result = await getProductsByCategory(
            { productService },
            { categoryId: "1" }
        );
        expect(result).toHaveLength(2);
        expect(result[0]!.categoryId).toBe("1");
    });
    test("if there are no products in the category you should return an empty list", async () => {;
        const productService = new MockedProductService([])
        const result = await getProductsByCategory(
            { productService },
            { categoryId: "1" }
        );
        expect(result).toHaveLength(0);
        expect(result).toStrictEqual([]);
    });
});