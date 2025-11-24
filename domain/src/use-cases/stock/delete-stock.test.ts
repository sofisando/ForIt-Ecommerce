import { describe, test, expect } from "vitest";
import { MockedStockService } from "../../services/mocks/mock-stock-service";
import { stockMock } from "../../entities/mocks/stock-mock";
import { deleteStock } from "./delete-stock";

describe("deleteStock", async () => {
  test("Should delete stock", async () => {
    const stockService = new MockedStockService([
      stockMock({ id: "1" }),
      stockMock({ id: "2" }),
    ]);
    const result = await deleteStock({ stockService }, { id: "1" });
    expect(result).toBeUndefined();

    const stocks = await stockService.findAll();
    expect(stocks).toHaveLength(1);
  });
  test("Should error if stock not found", async () => {
    const stockService = new MockedStockService([]);
    const result = await deleteStock({ stockService }, { id: "1" });
    expect(result).toStrictEqual(Error("Stock not found"));
  });
});
