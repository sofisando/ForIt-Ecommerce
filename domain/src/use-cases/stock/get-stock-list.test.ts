import { describe, test, expect } from "vitest";
import { stockMock } from "../../entities/mocks/stock-mock";
import { MockedStockService } from "../../services/mocks/mock-stock-service";
import { getStockList } from "./get-stock-list";

describe("getStockList", () => {
  test("Should get stock list", async () => {
    const stockService = new MockedStockService([
      stockMock(),
      stockMock(),
      stockMock({id: "stock-3"})
    ]);
    const result = await getStockList(
      { stockService }
    );
    expect(result).toHaveLength(3);
    expect(result[2]?.id).toBe("stock-3")
  });
});
