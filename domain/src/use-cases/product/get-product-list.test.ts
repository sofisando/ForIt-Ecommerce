import { describe, test, expect} from "vitest";
import { MockedProductService } from "../../services/mocks/mock-product-service";
import { productMock } from "../../entities/mocks/product-mock";
import { getProductList } from "./get-product-list";

describe("getProductList", async() => {
    test("Should return a array of products", async () => {
        const productService = new MockedProductService([
            productMock(),
            productMock()
        ]) //acá ejecutamos el constructor del Mock de servicio y le metemos Mocks de usuario
        const result = await getProductList(
            { productService }
        );
        expect(result).toHaveLength(2);
        expect(result).toStrictEqual(productService.products);
    });
    test("if there are no products you should return an empty list", async () => {;
        const productService = new MockedProductService([])
        const result = await getProductList(
            { productService }
        );
        expect(result).toHaveLength(0);
        expect(result).toStrictEqual([]);
    });
});