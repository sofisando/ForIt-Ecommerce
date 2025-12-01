import { describe, test, expect } from "vitest";
import { stockMock } from "../../entities/mocks/stock-mock";
import { increaseStockForProduct } from "./increase-stock-for-product";
import { MockedStockService } from "../../services/mocks/mock-stock-service";

describe("increaseStockForProduct", () => {
  test("increases existing stock", async () => {
    const stockService = new MockedStockService([
      stockMock({ productId: "P1", branchId: null, quantity: 5 }),
    ]);
    await increaseStockForProduct(
      { stockService },
      { productId: "P1", branchId: null, amount: 10 }
    );
    expect(stockService.stocks[0]?.quantity).toBe(15);
    expect(stockService.stocks.length).toBe(1);
  });

  test("Should throw error if stock not found for the product", async () => {
    const stockService = new MockedStockService([]);
    const result = await increaseStockForProduct(
      { stockService },
      { productId: "P1", branchId: null, amount: 10 }
    );

    expect(result).toStrictEqual(Error("Stock not found for this product"));
  });
});
