import type { Order, ProductInOrder } from "../../entities/order.js";
import type { ProductService } from "../../services/product-service.js";
import type { VariantService } from "../../services/variant-service.js";
import type { OrderService } from "../../services/order-service.js";
import { OrderState } from "../../entities/order.js";
import type { CreatePayload } from "../../utils/index.js";
import type { Cart } from "../../entities/cart.js";
import { notifyNewOrder } from "../email/notify-new-order.js";
import type { EmailService } from "../../services/email-service.js";
import { UserService } from "../../services/user-service.js";

interface CreateOrderDeps {
  orderService: OrderService;
  productService: ProductService;
  variantService: VariantService;
  emailService: EmailService;
  userService: UserService;
}

type CreateOrderPayload = CreatePayload<Cart> & {
  branchId: string | null;
};

export async function createOrder(
  { orderService, productService, variantService, emailService, userService}: CreateOrderDeps,
  payload: CreateOrderPayload
): Promise<Order | Error> {
  //verificar que el usuario exista
  const user = await userService.findById(payload.userId);
  if (!user) return new Error(`User ${payload.userId} not found`);

  // 1. Convertir cada ProductInCart a ProductInOrder (con snapshots)
  const productSnapshots: ProductInOrder[] = [];

  for (const item of payload.products) {
    // --- Buscar el producto ---
    const product = await productService.findById(item.productId);
    if (!product) return new Error(`Product ${item.productId} not found`);

    // --- Buscar variante (si existe) ---
    let variantSnapshot = undefined;
    if (item.variantId) {
      const variant = await variantService.findById(item.variantId);
      if (!variant) return new Error(`Variant ${item.variantId} not found`);

      variantSnapshot = {
        id: variant.id,
        attribute: {
          title: variant.attribute.title,
          name: variant.attribute.name,
          value: variant.attribute.value,
        },
      };
    }

    // --- Construir snapshot del producto ---
    productSnapshots.push({
      productId: product.id,
      name: product.name,
      price: product.price,
      variant: variantSnapshot,
      discountApplied: item.discountApplied
        ? {
            id: item.discountApplied.id,
            name: item.discountApplied.name,
            type: item.discountApplied.type,
            value: item.discountApplied.value,
          }
        : undefined,
      quantity: item.quantity,
      subtotal: item.subtotal,
    });
  }

  // 2. Armar objeto Order SIN id (la db lo crea)
  const orderData: CreatePayload<Order> = {
    userId: payload.userId,
    products: productSnapshots,
    branchId: payload.branchId,
    total: payload.total,
    state: OrderState.PENDING,
    date: new Date(),
  };

  // 3. Crear order usando el servicio (mock genera id)
  const createdOrder = await orderService.create(orderData);

  // >>> Llamás al caso de uso de notificación
  await notifyNewOrder(
    { emailService, orderService },
    { userEmail: user.email , orderId: createdOrder.id }
  );

  return createdOrder;
}
