import { Stock } from "../../entities/stock";
import type { StockService } from "../../services/stock-service";

interface DecreaseStockDeps {
  stockService: StockService;
}

interface DecreaseStockPayload {
  variantId: string;
  branchId: string | null;
  amount: number;
}

export async function decreaseStock({stockService}: DecreaseStockDeps,
  {variantId, branchId , amount}: DecreaseStockPayload
): Promise< Stock | Error > {
  
    const stock = await stockService.getByVariantAndBranch(variantId, branchId);

    if (!stock) {
      return new Error("Stock not found for this variant");
    }

    if (stock.quantity < amount) {
      return new Error("Not enough stock");
    }

    const stockUpdated = stockService.editOne({
      id: stock.id,
      quantity: stock.quantity - amount,
    });
    return stockUpdated
  };
