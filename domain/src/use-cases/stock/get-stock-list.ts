import { Stock } from "../../entities/stock";
import type { StockService } from "../../services/stock-service";

interface GetStockListDeps {
  stockService: StockService;
}

export async function getStockList({
  stockService,
}: GetStockListDeps): Promise<Stock[]> {
  const stocks = await stockService.findAll();
  return stocks;
}