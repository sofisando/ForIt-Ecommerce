import type { StockService } from "../../services/stock-service";
import type { Stock } from "../../entities/stock";
import { ProductService } from "../../services";

interface DecreaseStockForProductDeps {
  stockService: StockService;
  productService: ProductService;
}

interface DecreaseStockForProductPayload {
  productId: string;
  branchId: string | null;
  amount: number;
}

export async function decreaseStockForProduct(
  { stockService, productService}: DecreaseStockForProductDeps,
  { productId, branchId, amount }: DecreaseStockForProductPayload
): Promise<Stock | Error> {

  const stock = await stockService.getByProductAndBranch(productId, branchId);

  if (!stock) {
    const product = await productService.findById(productId);
    const productName = product?.name ?? productId;
    return new Error(`Stock not found for product: ${productName}`);
  }

  if (stock.quantity < amount) {
    const product = await productService.findById(productId);
    const productName = product?.name ?? productId;
    return new Error(`Not enough stock for product: ${productName}`);
  }

  const updated = await stockService.editOne({
    id: stock.id,
    quantity: stock.quantity - amount,
  });

  return updated;
}
