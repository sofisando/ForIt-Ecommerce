import { Stock } from "../../entities/stock";
import type { StockService } from "../../services/stock-service";

interface IncreaseStockProductDeps {
  stockService: StockService;
}

interface IncreaseStockProductPayload {
  productId: string;
  branchId: string | null;
  amount: number;
}

export async function increaseStockForProduct(
  { stockService }: IncreaseStockProductDeps,
  { productId, branchId, amount }: IncreaseStockProductPayload
): Promise<Stock | Error> {
    const stock = await stockService.getByProductAndBranch(productId, branchId);

    if (!stock) {
      return new Error("Stock not found for this product");
    }

    const stockUpdated = await stockService.editOne({
      id: stock.id,
      quantity: stock.quantity + amount,
    });
    return stockUpdated;
  };
