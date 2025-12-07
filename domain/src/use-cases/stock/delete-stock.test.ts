import { describe, test, expect } from "vitest";
import { MockedStockService } from "../../services/mocks/mock-stock-service";
import { stockMock } from "../../entities/mocks/stock-mock";
import { deleteStock } from "./delete-stock";
import { MockedUserService } from "../../services/mocks/mock-user-service";
import { userMock } from "../../entities/mocks/user-mock";

describe("deleteStock", async () => {
  const userService = new MockedUserService([
    userMock({ id: "user-1", role: "ADMIN" }),
    userMock({ id: "user-2", role: "CLIENT" }),
  ]);
  const stockService = new MockedStockService([
    stockMock({ id: "1" }),
    stockMock({ id: "2" }),
  ]);

  test("Should delete stock", async () => {
    const result = await deleteStock(
      { stockService, userService },
      { id: "1", userId: "user-1" }
    );
    expect(result).toBeUndefined();

    const stocks = await stockService.findAll();
    expect(stocks).toHaveLength(1);
  });
  test("Should error if stock not found", async () => {
    const result = await deleteStock(
      { stockService, userService },
      { id: "999", userId: "user-1" }
    );
    expect(result).toStrictEqual(Error("Stock not found"));
  });
  test("Should error if user not found", async () => {
    const result = await deleteStock(
      { stockService, userService },
      { id: "1", userId: "user-999" }
    );
    expect(result).toStrictEqual(Error("User user-999 not found"));
  });
  test("Should error if user is not ADMIN", async () => {
    const result = await deleteStock(
      { stockService, userService },
      { id: "1", userId: "user-2" }
    );
    expect(result).toStrictEqual(Error("User is not ADMIN"));
  });
});
