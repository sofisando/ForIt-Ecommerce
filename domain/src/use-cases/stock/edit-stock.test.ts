import { describe, test, expect } from "vitest";
import { stockMock } from "../../entities/mocks/stock-mock";
import { MockedStockService } from "../../services/mocks/mock-stock-service";
import { editStock } from "./edit-stock";


describe("editStock", () => {
  test("edit existing stock", async () => {
    const stockService = new MockedStockService([
      stockMock({ variantId: "V1", branchId: null, quantity: 5 }),
    ]);
    await editStock(
      { stockService },
      { variantId: "V1", branchId: null, quantity: 3 }
    );
    expect(stockService.stocks[0]?.quantity).toBe(3);
    expect(stockService.stocks.length).toBe(1);
  });

  test("Should throw error if stock not found", async () => {
    const stockService = new MockedStockService([]);
    const result = await editStock(
      { stockService },
      { variantId: "V1", branchId: null, quantity: 10 }
    );

    expect(result).toStrictEqual(Error("Stock not found"));
  });
});
