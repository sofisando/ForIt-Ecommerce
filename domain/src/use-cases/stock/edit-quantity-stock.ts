import type { StockService } from "../../services/stock-service";

interface EditStockDeps {
  stockService: StockService;
}

interface EditStockPayload {
  variantId: string;
  branchId: string | null;
  quantity: number;
}

export async function editStock(
  { stockService }: EditStockDeps,
  { variantId, branchId, quantity }: EditStockPayload
) {
  const stock = await stockService.getByVariantAndBranch(variantId, branchId);

  if (!stock) {
    return new Error("Stock not found");
  }

  const stockUpdated = stockService.editOne({
    id: stock.id,
    quantity,
  });

  return stockUpdated;
}
