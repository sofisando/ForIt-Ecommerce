import { Stock } from "../../entities/stock";
import { StockService } from "../../services/stock-service";

interface GetStockByVariantDeps {
  stockService: StockService;
}

interface GetStockByVariantPayload {
  variantId: string;
}

export async function getStockByVariant(
  { stockService }: GetStockByVariantDeps,
  { variantId }: GetStockByVariantPayload
): Promise<Stock[]> {
  const stock = await stockService.getByVariantId(variantId);
  return stock;
};