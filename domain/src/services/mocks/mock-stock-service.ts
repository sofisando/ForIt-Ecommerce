import type { Stock } from "../../entities/stock";
import type { StockService } from "../stock-service";
import type { CreatePayload, UpdatePayload } from "../../utils";

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

  create = async (data: CreatePayload<Stock>): Promise<Stock> => {
    const newStock = {
      ...data,
      id: crypto.randomUUID(),
    } satisfies Stock;

    this.stocks.push(newStock);
    return newStock;
  };

  editOne = async (data: UpdatePayload<Stock>): Promise<Stock> => {
    const index = this.stocks.findIndex((s) => s.id === data.id);
    if (index === -1) throw Error("Stock not found");

    const updated = { ...this.stocks[index], ...data } as Stock;
    this.stocks[index] = updated;

    return updated;
  };

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
}
