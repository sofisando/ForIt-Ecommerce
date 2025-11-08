import { describe, test, expect} from "vitest";
import { MockedDiscountService } from "../../services/mocks/mock-discount-service";
import { discountMock } from "../../entities/mocks/discount-mock";
import { getActiveDiscounts } from "./get-active-discount-list";

describe("getActiveDiscounts", async() => {
    test("Should return a array of active discounts", async () => {
        const discountService = new MockedDiscountService([
            discountMock({ active: true }),
            discountMock({ active: false }),
            discountMock({ active: true }),
        ]);
        const result = await getActiveDiscounts(
            { discountService }
        );
        expect(result).toHaveLength(2);
        expect(result[0]!.active).toBe(true);
    });
    test("if there are no active discounts you should return an empty list", async () => {;
        const discountService = new MockedDiscountService([])
        const result = await getActiveDiscounts(
            { discountService }
        );
        expect(result).toHaveLength(0);
        expect(result).toStrictEqual([]);
    });
});