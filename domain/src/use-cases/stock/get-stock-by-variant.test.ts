import { describe, test, expect } from "vitest";
import { stockMock } from "../../entities/mocks/stock-mock";
import { MockedStockService } from "../../services/mocks/mock-stock-service";
import { getStockByVariant } from "./get-stock-by-variant";

describe("getStockByVariant", () => {
  test("Should get stock by variant", async () => {
    const stockService = new MockedStockService([
      stockMock({ variantId: "V1", branchId: null, quantity: 5 }),
    ]);
    const result = await getStockByVariant(
      { stockService },
      { variantId: "V1" }
    );
    expect(result).toStrictEqual([{
      id: expect.any(String),
      variantId: "V1",
      branchId: null,
      quantity: 5,
    }]);
  });
});
