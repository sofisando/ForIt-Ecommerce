import { describe, test, expect } from "vitest";
import { stockMock } from "../../entities/mocks/stock-mock";
import { MockedStockService } from "../../services/mocks/mock-stock-service";
import { productMock } from "../../entities/mocks/product-mock";
import { MockedProductService } from "../../services/mocks/mock-product-service";
import { decreaseStockForProduct } from "./decrease-stock-for-product";

describe("decreaseStockForProduct", () => {
  const productService = new MockedProductService([
    productMock({
      id: "Product-1",
      name: "Laptop"
    }),
  ]);
  test("decreases existing stock", async () => {
    const stockService = new MockedStockService([
      stockMock({ productId: "Product-1", branchId: null, quantity: 5 }),
    ]);
    await decreaseStockForProduct(
      { stockService, productService },
      { productId: "Product-1", branchId: null, amount: 3 }
    );
    expect(stockService.stocks[0]?.quantity).toBe(2);
    expect(stockService.stocks.length).toBe(1);
  });

  test("Should throw error if is not enough stock", async () => {
    const stockService = new MockedStockService([
      stockMock({ productId: "Product-1", branchId: null, quantity: 5 }),
    ]);
    const result = await decreaseStockForProduct(
      { stockService, productService },
      { productId: "Product-1", branchId: null, amount: 10 }
    );
    expect(result).toStrictEqual(Error("Not enough stock for product: Laptop"));
  });

  test("Should throw error if stock not found for the product", async () => {
    const stockService = new MockedStockService([]);
    const result = await decreaseStockForProduct(
      { stockService, productService },
      { productId: "Product-1", branchId: null, amount: 10 }
    );

    expect(result).toStrictEqual(Error("Stock not found for product: Laptop"));
  });
});
