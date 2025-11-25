import { describe, test, expect} from "vitest";
import { MockedVariantService } from "../../services/mocks/mock-variant-service";
import { variantMock } from "../../entities/mocks/variant-mock";
import { getVariantByProduct } from "./get-variant-by-product";


describe("getVariantByProduct", async() => {
    test("Should return a array of variants filtered by product", async () => {
        const variantService = new MockedVariantService([
            variantMock({ productId: "1" }),
            variantMock({ productId: "1" }),
            variantMock({ productId: "2" }),
        ]);
        const result = await getVariantByProduct(
            { variantService },
            { productId: "1" }
        );
        expect(result).toHaveLength(2);
        expect(result[0]!.productId).toBe("1");
    });
    test("if there are no variants in the product you should return an empty list", async () => {;
        const variantService = new MockedVariantService([])
        const result = await getVariantByProduct(
            { variantService },
            { productId: "99999" }
        );
        expect(result).toHaveLength(0);
        expect(result).toStrictEqual([]);
    });
});