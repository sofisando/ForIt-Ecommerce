import { Stock } from "../../entities/stock";
import type { StockService } from "../../services/stock-service";
import { DeletePayload } from "../../utils";

interface DeleteStockDeps {
  stockService: StockService;
}

type DeleteStockPayload = DeletePayload<Stock>

export async function deleteStock(
  { stockService }: DeleteStockDeps,
  { id }: DeleteStockPayload
): Promise<Error | void> {
  const stock = await stockService.findById(id);

  if (!stock) {
    return new Error("Stock not found");
  }

  stockService.delete({ id });
}
