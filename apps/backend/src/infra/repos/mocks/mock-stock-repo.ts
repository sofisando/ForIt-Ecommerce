import type { Stock } from "@forit/domain/src/entities/stock.js";
import type { StockService } from "@forit/domain/src/repos/stock-repository.js";

export class MockedStockService implements StockService {
  stocks: Stock[] = [];

  constructor(stocks: Stock[]) {
    this.stocks = stocks;
  }

  findById = async (id: string): Promise<Stock | null> => {
    return this.stocks.find((s) => s.id === id) ?? null;
  };

  findAll = async (): Promise<Stock[]> => {
    return this.stocks;
  };

  async save(stock: Stock): Promise<void> {
    const index = this.stocks.findIndex((s) => s.id === stock.id);

    if (index === -1) {
      this.stocks.push(stock);
    } else {
      this.stocks[index] = stock;
    }
  }

  delete = async (data: { id: string }): Promise<void> => {
    this.stocks = this.stocks.filter((s) => s.id !== data.id);
  };

  getByVariantId = async (variantId: string): Promise<Stock[]> => {
    return this.stocks.filter((s) => s.variantId === variantId);
  };

  getByVariantAndBranch = async (
    variantId: string,
    branchId: string | null
  ): Promise<Stock | null> => {
    return (
      this.stocks.find(
        (s) => s.variantId === variantId && s.branchId === branchId
      ) ?? null
    );
  };
  getByProductAndBranch = async (
    productId: string,
    branchId: string | null
  ): Promise<Stock | null> => {
    return (
      this.stocks.find(
        (s) => s.productId === productId && s.branchId === branchId
      ) ?? null
    );
  };
}
