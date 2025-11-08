import { describe, test, expect} from "vitest";
import { MockedDiscountService } from "../../services/mocks/mock-discount-service";
import { discountMock } from "../../entities/mocks/discount-mock";
import { getDiscountList } from "./get-discount-list";

describe("getDiscountList", async() => {
    test("Should return a array of discounts", async () => {
        const discountService = new MockedDiscountService([
            discountMock(),
            discountMock()
        ]) //acá ejecutamos el constructor del Mock de servicio y le metemos Mocks de usuario
        const result = await getDiscountList(
            { discountService }
        );
        expect(result).toHaveLength(2);
        expect(result).toStrictEqual(discountService.discounts);
    });
    test("if there are no discounts you should return an empty list", async () => {;
        const discountService = new MockedDiscountService([])
        const result = await getDiscountList(
            { discountService }
        );
        expect(result).toHaveLength(0);
        expect(result).toStrictEqual([]);
    });
});