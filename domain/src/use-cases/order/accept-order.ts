import type { ProductService } from "../../services/product-service.js";
import type { VariantService } from "../../services/variant-service.js";
import type { OrderService } from "../../services/order-service.js";
import { Order, OrderState } from "../../entities/order.js";
import { StockService } from "../../services/stock-service.js";
import { decreaseStock } from "../stock/decrease-stock.js";

interface AcceptOrderDeps {
  orderService: OrderService;
  productService: ProductService;
  stockService: StockService;
  variantService: VariantService;
}

interface AcceptOrderPayload {
  orderId: Order["id"];
}

export async function acceptOrder(
  { orderService, productService, variantService, stockService }: AcceptOrderDeps,
  { orderId }: AcceptOrderPayload
) {
  const order = await orderService.findById(orderId);
  if (!order) return new Error("Order not found");

  if (order.state !== OrderState.PENDING)
    return new Error("Order not in pending state");

  // Verificar cada producto y decrementar stock
  for (const item of order.products) {
    const product = await productService.findById(item.productId);
    if (!product) return new Error(`Product ${item.productId} not found`);

    // Si tiene variante → validar y descontar stock
    if (item.variant?.id) {
      const variant = await variantService.findById(item.variant.id);
      if (!variant) return new Error(`Variant ${item.variant.id} not found`);

      const stockResult = await decreaseStock(
        { stockService, variantService },
        {
          variantId: item.variant.id,
          branchId: order.branchId, 
          amount: item.quantity,
        }
      );

      if (stockResult instanceof Error) return stockResult;
    }
  }

  // Finalmente, cambiar estado
  return await orderService.updateStateOrder(order.id, OrderState.ACEPTED);
}

