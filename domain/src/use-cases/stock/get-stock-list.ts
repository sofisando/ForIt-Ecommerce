import { Stock } from "../../entities/stock";
import type { StockService } from "../../repos/stock-repository";

interface GetStockListDeps {
  stockService: StockService;
}

export async function getStockList({
  stockService,
}: GetStockListDeps): Promise<Stock[]> {
  const stocks = await stockService.findAll();
  return stocks;
}