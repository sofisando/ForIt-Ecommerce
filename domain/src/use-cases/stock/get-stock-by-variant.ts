import { StockService } from "../../services/stock-service";

interface GetStockByVariantDeps {
  stockService: StockService;
}

interface GetStockByVariantPayload {
  variantId: string;
}

export const getStockByVariant = async (
  {stockService}: GetStockByVariantDeps,
  {variantId}: GetStockByVariantPayload
) => {
  const stock = await stockService.getByVariantId(variantId);
  return stock;
};