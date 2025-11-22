import { Stock } from "../../entities/stock.js";
import { StockService } from "../../services/stock-service.js";

import type { CreatePayload } from "../../utils/types/payload.js";

interface CreateStockDeps {
  stockService: StockService;
}

type CreateStockPayload = CreatePayload<Stock>;

export async function createStock(
  { stockService }: CreateStockDeps,
  payload: CreateStockPayload
): Promise<Stock | Error> {
  const foundStock = await stockService.getByVariantAndBranch(
    payload.variantId,
    payload.branchId
  );
  if (foundStock)
    return new Error(
      `This variant: ${payload.variantId} is already created in this branch: ${payload.branchId}`
    );

  const stock = await stockService.create(payload);

  return stock;
}
