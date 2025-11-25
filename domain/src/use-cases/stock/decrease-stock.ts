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

export async function decreaseStock({stockService, variantService}: DecreaseStockDeps,
  {variantId, branchId , amount}: DecreaseStockPayload
): Promise< Stock | Error > {
  
    const stock = await stockService.getByVariantAndBranch(variantId, branchId);

    if (!stock) {
      const variant = await variantService.findById(variantId);
      return new Error(`Stock not found for variant: ${variant!.attribute.name}`);
      //despues poner en qué producto no hay stock de esa variante
    }

    if (stock.quantity < amount) {
      const variant = await variantService.findById(variantId);
      return new Error(`Not enough stock for variant: ${variant?.attribute.name}`);
    }

    const stockUpdated = stockService.editOne({
      id: stock.id,
      quantity: stock.quantity - amount,
    });
    return stockUpdated
  };
