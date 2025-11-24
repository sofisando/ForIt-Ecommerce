import { Stock } from "../../entities/stock";
import type { StockService } from "../../services/stock-service";

interface IncreaseStockDeps {
  stockService: StockService;
}

interface IncreaseStockPayload {
  variantId: string;
  branchId: string | null;
  amount: number;
}

export async function increaseStock(
  { stockService }: IncreaseStockDeps,
  { variantId, branchId, amount }: IncreaseStockPayload
): Promise<Stock | Error> {
    const stock = await stockService.getByVariantAndBranch(variantId, branchId);

    if (!stock) {
      return new Error("Stock not found for this variant");
    }

    const stockUpdated = await stockService.editOne({
      id: stock.id,
      quantity: stock.quantity + amount,
    });
    return stockUpdated;
  };
