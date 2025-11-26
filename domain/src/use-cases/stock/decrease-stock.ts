import { Stock } from "../../entities/stock";
import { VariantService } from "../../services";
import type { StockService } from "../../services/stock-service";

interface DecreaseStockDeps {
  stockService: StockService;
  variantService: VariantService;
}

interface DecreaseStockPayload {
  variantId: string;
  branchId: string | null;
  amount: number;
}

export async function decreaseStock(
  { stockService, variantService }: DecreaseStockDeps,
  { variantId, branchId, amount }: DecreaseStockPayload
): Promise<Stock | Error> {
  
  const stock = await stockService.getByVariantAndBranch(variantId, branchId);

  // No existe entrada de stock para esa variante en esa sucursal
  if (!stock) {
    const variant = await variantService.findById(variantId);
    const variantName = variant?.attribute.name ?? variantId;
    return new Error(`Stock not found for variant: ${variantName}`);
  }
  
  if (stock.quantity < amount) {
    const variant = await variantService.findById(variantId);
    const variantName = variant?.attribute.name ?? variantId;
    return new Error(`Not enough stock for variant: ${variantName}`);
  }

  const updated = await stockService.editOne({
    id: stock.id,
    quantity: stock.quantity - amount,
  });

  return updated;
}
