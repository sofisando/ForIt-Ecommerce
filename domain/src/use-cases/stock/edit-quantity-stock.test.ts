import { describe, test, expect } from "vitest";
import { stockMock } from "../../entities/mocks/stock-mock";
import { MockedStockService } from "../../services/mocks/mock-stock-service";
import { editStock } from "./edit-quantity-stock";
import { MockedUserService } from "../../services/mocks/mock-user-service";
import { userMock } from "../../entities/mocks/user-mock";

describe("editStock", () => {
  const userService = new MockedUserService([
    userMock({ id: "user-1", role: "ADMIN" }),
    userMock({ id: "user-2", role: "CLIENT" }),
  ]);
  const stockService = new MockedStockService([
      stockMock({ variantId: "V1", branchId: null, quantity: 5 }),
      stockMock({ productId: "P1", branchId: null, quantity: 10 }),

    ]);
  test("edit existing stock using variantId", async () => {
    await editStock(
      { stockService, userService },
      {
        userId: "user-1",
        data: { variantId: "V1", branchId: null, quantity: 3 },
      }
    );
    expect(stockService.stocks[0]?.quantity).toBe(3);
    expect(stockService.stocks.length).toBe(2);
  });

  test("edit existing stock using productId", async () => {
    await editStock(
      { stockService, userService },
      {
        userId: "user-1",
        data: { productId: "P1", branchId: null, quantity: 3 },
      }
    );
    expect(stockService.stocks[0]?.quantity).toBe(3);
    expect(stockService.stocks.length).toBe(2);
  });

  test("Should return error if stock with variantId not found", async () => {
    const result = await editStock(
      { stockService, userService },
      {
        userId: "user-1",
        data: { variantId: "V999", branchId: null, quantity: 10 },
      }
    );
    expect(result).toStrictEqual(Error("Stock not found"));
  });

  test("Should return error if stock with productId not found", async () => {
    const result = await editStock(
      { stockService, userService },
      {
        userId: "user-1",
        data: { productId: "P999", branchId: null, quantity: 10 },
      }
    );
    expect(result).toStrictEqual(Error("Stock not found"));
  });

  test("Should return error if user not found", async () => {
    const result = await editStock(
      { stockService, userService },
      {
        userId: "user-999",
        data: { variantId: "V1", branchId: null, quantity: 10 },
      }
    );
    expect(result).toStrictEqual(Error("User user-999 not found"));
  });
  test("Should return error if user is not ADMIN", async () => {
    const result = await editStock(
      { stockService, userService },
      {
        userId: "user-2",
        data: { variantId: "V1", branchId: null, quantity: 10 },
      }
    );
    expect(result).toStrictEqual(Error("User is not ADMIN"));
  });
});
