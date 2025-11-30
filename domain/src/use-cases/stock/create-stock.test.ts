import { describe, expect, test } from "vitest";
import { MockedStockService } from "../../services/mocks/mock-stock-service";
import { stockMock } from "../../entities/mocks/stock-mock";
import { createStock } from "./create-stock";

describe("createStock", async () => {
  test("should create new stock using a variantId", async () => {
    const stockService = new MockedStockService([stockMock()]);
    
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

  test("should create new stock using a productId", async () => {
    const stockService = new MockedStockService([]);

    await createStock(
      { stockService },
      {
        productId: "product-123",
        branchId: null,
        quantity: 10,
      }
    );

    expect(stockService.stocks).toHaveLength(1);
    expect(stockService.stocks[0]).toStrictEqual({
      id: expect.any(String),
      productId: "product-123",
      branchId: null,
      quantity: 10,
    });
  });

  test("should return error if stock already exists for same variantId + branch", async () => {
    const stockService = new MockedStockService([
      {
        ...stockMock(),
        variantId: "v1",
        branchId: null,
      },
    ]);

    const result = await createStock(
      { stockService },
      {
        variantId: "v1",
        branchId: null,
        quantity: 3,
      }
    );

    expect(result).toBeInstanceOf(Error);
  });

  test("should return error if stock already exists for same productId + branch", async () => {
    const stockService = new MockedStockService([
      {
        ...stockMock(),
        productId: "p1",
        branchId: null,
      },
    ]);

    const result = await createStock(
      { stockService },
      {
        productId: "p1",
        branchId: null,
        quantity: 3,
      }
    );

    expect(result).toBeInstanceOf(Error);
  });


  // test("should return error if both productId and variantId are provided", async () => {
  //   const stockService = new MockedStockService([]);

  //   const result = await createStock(
  //     { stockService },
  //     {
  //       productId: "p1",
  //       variantId: "v1",
  //       branchId: null,
  //       quantity: 5,
  //     }
  //   );

  //   expect(result).toBeInstanceOf(Error);
  // });
});
