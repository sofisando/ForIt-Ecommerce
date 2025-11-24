import type { StockService } from "../../services/stock-service";

interface GetStockListDeps {
  stockService: StockService;
}

export async function getStockList(
  { stockService }: GetStockListDeps) {
  const stocks = await stockService.findAll();
  return stocks;
}
