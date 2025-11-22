import { describe, expect, test } from "vitest";
import { MockedStockService } from "../../services/mocks/mock-stock-service";
import { stockMock } from "../../entities/mocks/stock-mock";
import { createStock } from "./create-stock";

describe("createStock", async () => {
  const stockService = new MockedStockService([stockMock()]);

  test("should create a new stock", async () => {
    await createStock(
      { stockService },
      {
        variantId: "variant-002",
        branchId: null,
        quantity: 2,
      }
    );

    expect(stockService.stocks).toHaveLength(2);
    expect(stockService.stocks[1]).toStrictEqual({
      id: expect.any(String),
      variantId: "variant-002",
      branchId: null,
      quantity: 2,
    });
  });

  test("If the name is already registered it should return an error.", async () => {
    const result = await createStock(
      { stockService },
      {
        variantId: "variant-002",
        branchId: null,
        quantity: 6,
      }
    );

    expect(result).toBeInstanceOf(Error);
  });
});
