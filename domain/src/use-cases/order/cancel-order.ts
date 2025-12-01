import type { ProductService } from "../../services/product-service.js";
import type { VariantService } from "../../services/variant-service.js";
import type { OrderService } from "../../services/order-service.js";
import { Order, OrderState } from "../../entities/order.js";
import { StockService } from "../../services/stock-service.js";
import { increaseStockForVariant } from "../stock/increase-stock-for-variant.js";
import { increaseStockForProduct } from "../stock/increase-stock-for-product.js";

interface CancelOrderDeps {
  orderService: OrderService;
  productService: ProductService;
  stockService: StockService;
  variantService: VariantService;
}

interface CancelOrderPayload {
  orderId: Order["id"];
}

export async function cancelOrder(
  {
    orderService,
    productService,
    variantService,
    stockService,
  }: CancelOrderDeps,
  { orderId }: CancelOrderPayload
) {
  const order = await orderService.findById(orderId);
  if (!order) return new Error("Order not found");

  if (order.state == OrderState.CANCELED)
    return new Error("Order is already canceled");

  // buscar cada producto e incrementar stock
  for (const item of order.products) {
    const product = await productService.findById(item.productId);
    if (!product) return new Error(`Product ${item.productId} not found`);

    // Si tiene variante → validar e incrementar stock
    if (item.variant) {
      const variant = await variantService.findById(item.variant.id);
      if (!variant) return new Error(`Variant ${item.variant.id} not found`);

      const result = await increaseStockForVariant(
        { stockService },
        {
          variantId: item.variant.id,
          branchId: order.branchId,
          amount: item.quantity,
        }
      );

      if (result instanceof Error) {
        return new Error(
          `Stock not found for variant: ${variant.attribute.name}`
        );
      }
    } else {
      // producto sin variantes → usar productId
      const result = await increaseStockForProduct(
        { stockService },
        {
          productId: item.productId,
          branchId: order.branchId,
          amount: item.quantity,
        }
      );

      if (result instanceof Error) {
        return new Error(
          `Stock not found for product: ${product.name}`
        );
      }
    }
  }

  // Finalmente, cambiar estado
  return await orderService.updateStateOrder(order.id, OrderState.CANCELED);
}
