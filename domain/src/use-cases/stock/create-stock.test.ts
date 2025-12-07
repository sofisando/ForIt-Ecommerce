import { describe, expect, test } from "vitest";
import { MockedStockService } from "../../services/mocks/mock-stock-service";
import { stockMock } from "../../entities/mocks/stock-mock";
import { createStock } from "./create-stock";
import { MockedUserService } from "../../services/mocks/mock-user-service";
import { userMock } from "../../entities/mocks/user-mock";

describe("createStock", async () => {
  const userService = new MockedUserService([
    userMock({ id: "user-1", role: "ADMIN" }),
    userMock({ id: "user-2", role: "CLIENT" }),
  ]);
  const stockService = new MockedStockService([
    stockMock(stockMock({ variantId: "v1", branchId: null })),
    stockMock(stockMock({ productId: "p1", branchId: null }))
  ]);
  test("should create new stock using variantId", async () => {
    await createStock(
      { stockService, userService },
      {
        userId: "user-1",
        data: {
          variantId: "variant-002",
          branchId: null,
          quantity: 2,
        },
      }
    );
    expect(stockService.stocks).toHaveLength(3);
    expect(stockService.stocks[2]).toStrictEqual({
      id: expect.any(String),
      variantId: "variant-002",
      branchId: null,
      quantity: 2,
    });
  });

  test("should create new stock using a productId", async () => {
    await createStock(
      { stockService, userService },
      {
        userId: "user-1",
        data: {
          productId: "product-123",
          branchId: null,
          quantity: 10,
        },
      }
    );
    expect(stockService.stocks).toHaveLength(4);
    expect(stockService.stocks[3]).toStrictEqual({
      id: expect.any(String),
      productId: "product-123",
      branchId: null,
      quantity: 10,
    });
  });

  test("should return error if stock already exists for same variantId + branch", async () => {
    const result = await createStock(
      { stockService, userService },
      {
        userId: "user-1",
        data: {
          variantId: "v1",
          branchId: null,
          quantity: 3,
        },
      }
    );
    expect(result).toStrictEqual(Error("This variant: v1 is already created in this branch: null"));
  });

  test("should return error if stock already exists for same productId + branch", async () => {
    const result = await createStock(
      { stockService, userService },
      {
        userId: "user-1",
        data: {
          productId: "p1",
          branchId: null,
          quantity: 3,
        },
      }
    );
    expect(result).toStrictEqual(Error("This product: p1 already has stock in branch: null"));
  });

  test("should return error if user not found", async () => {
    const result = await createStock(
      { stockService, userService },
      {
        userId: "user-999",
        data: {
          productId: "p1",
          branchId: null,
          quantity: 3,
        },
      }
    );
    expect(result).toStrictEqual(Error("User user-999 not found"));
  });

  test("should return error if user is not ADMIN", async () => {
    const result = await createStock(
      { stockService, userService },
      {
        userId: "user-2",
        data: {
          productId: "p1",
          branchId: null,
          quantity: 3,
        },
      }
    );
    expect(result).toStrictEqual(Error("User is not ADMIN"));
  });
});
