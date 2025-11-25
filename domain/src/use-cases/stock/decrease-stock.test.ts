import { describe, test, expect } from "vitest";
import { stockMock } from "../../entities/mocks/stock-mock";
import { MockedStockService } from "../../services/mocks/mock-stock-service";
import { decreaseStock } from "./decrease-stock";
import { MockedVariantService } from "../../services/mocks/mock-variant-service";
import { variantMock } from "../../entities/mocks/variant-mock";

describe("decreaseStock", () => {
  const variantService = new MockedVariantService([
    variantMock({
      id: "V1",
      attribute: { title: "Color", name: "Rojo", value: "#ff0000" },
      productId: "P1",
    }),
  ]);
  test("decreases existing stock", async () => {
    const stockService = new MockedStockService([
      stockMock({ variantId: "V1", branchId: null, quantity: 5 }),
    ]);
    await decreaseStock(
      { stockService, variantService },
      { variantId: "V1", branchId: null, amount: 3 }
    );
    expect(stockService.stocks[0]?.quantity).toBe(2);
    expect(stockService.stocks.length).toBe(1);
  });

  test("Should throw error if is not enough stock", async () => {
    const stockService = new MockedStockService([
      stockMock({ variantId: "V1", branchId: null, quantity: 5 }),
    ]);
    const result = await decreaseStock(
      { stockService, variantService },
      { variantId: "V1", branchId: null, amount: 10 }
    );
    expect(result).toStrictEqual(Error("Not enough stock for variant: Rojo"));
  });

  test("Should throw error if stock not found for the variant", async () => {
    const stockService = new MockedStockService([]);
    const result = await decreaseStock(
      { stockService, variantService },
      { variantId: "V1", branchId: null, amount: 10 }
    );

    expect(result).toStrictEqual(Error("Stock not found for variant: Rojo"));
  });
});
