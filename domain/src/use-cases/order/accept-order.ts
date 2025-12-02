import type { ProductService } from "../../services/product-service.js";
import type { VariantService } from "../../services/variant-service.js";
import type { OrderService } from "../../services/order-service.js";
import { Order, OrderState } from "../../entities/order.js";
import { StockService } from "../../services/stock-service.js";
import { decreaseStockForVariant } from "../stock/decrease-stock-for-variant.js";
import { decreaseStockForProduct } from "../stock/decrease-stock-for-product.js";
import type { UserService } from "../../services/user-service.js";
import type { EmailService } from "../../services/email-service.js";
import type { User } from "../../entities/user.js";
import { notifyUpdateStateOrder } from "../email/notify-update-state-order.js";

interface AcceptOrderDeps {
  orderService: OrderService;
  productService: ProductService;
  stockService: StockService;
  variantService: VariantService;
  userService: UserService;
  emailService: EmailService;
}

interface AcceptOrderPayload {
  orderId: Order["id"];
  userId: User["id"];
}

export async function acceptOrder(
  { orderService, productService, variantService, stockService, emailService, userService }: AcceptOrderDeps,
  { orderId, userId }: AcceptOrderPayload
) {

  //verificar que el usuario exista
  const user = await userService.findById(userId);
  if (!user) return new Error(`User ${userId} not found`);

  const order = await orderService.findById(orderId);
  if (!order) return new Error("Order not found");

  if (order.state !== OrderState.PENDING)
    return new Error("Order not in pending state");

  // Verificar cada producto y decrementar stock
  for (const item of order.products) {
    const product = await productService.findById(item.productId);
    if (!product) return new Error(`Product ${item.productId} not found`);

    // Si tiene variante → validar y descontar stock
    if (item.variant) {
      const variant = await variantService.findById(item.variant.id);
      if (!variant) return new Error(`Variant ${item.variant.id} not found`);

      const result = await decreaseStockForVariant(
        { stockService, variantService },
        {
          variantId: item.variant.id,
          branchId: order.branchId,
          amount: item.quantity,
        }
      );

      if (result instanceof Error) return result;
    } else {
      // producto sin variantes → usar productId
      const result = await decreaseStockForProduct(
        { stockService , productService},
        {
          productId: item.productId,
          branchId: order.branchId,
          amount: item.quantity,
        }
      );

      if (result instanceof Error) return result;
    }
  }

  // Finalmente, cambiar estado
  const aceptedOrder = await orderService.updateStateOrder(order.id, OrderState.ACEPTED);
  // Mandar notificacion por email
    await notifyUpdateStateOrder(
      { emailService, orderService },
      { userEmail: user.email , orderId: order.id , state: OrderState.ACEPTED}
    );

  return aceptedOrder;
}
