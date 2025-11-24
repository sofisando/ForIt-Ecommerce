import { describe, test, expect } from "vitest";
import { stockMock } from "../../entities/mocks/stock-mock";
import { increaseStock } from "./increase-stock";
import { MockedStockService } from "../../services/mocks/mock-stock-service";

describe("increaseStock", () => {
  test("increases existing stock", async () => {
    const stockService = new MockedStockService([
      stockMock({ variantId: "V1", branchId: null, quantity: 5 }),
    ]);
    await increaseStock(
      { stockService },
      { variantId: "V1", branchId: null, amount: 10 }
    );
    expect(stockService.stocks[0]?.quantity).toBe(15);
    expect(stockService.stocks.length).toBe(1);
  });

  test("Should throw error if stock not found for the variant", async () => {
    const stockService = new MockedStockService([]);
    const result = await increaseStock(
      { stockService },
      { variantId: "V1", branchId: null, amount: 10 }
    );

    expect(result).toStrictEqual(Error("Stock not found for this variant"));
  });
});
