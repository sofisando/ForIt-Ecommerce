import type { Cart } from "../../entities/cart.js";
import type { Order, OrderState } from "../../entities/order.js";
import type { ProductService } from "../../services/product-service.js";
import type { OrderService } from "../../services/order-service.js";
import { OrderState as State } from "../../entities/order.js";

interface CreateOrderDeps {
  orderService: OrderService;
  productService: ProductService;
}

interface CreateOrderPayload {
  cart: Cart;
}

export async function createOrder(
  { orderService, productService }: CreateOrderDeps,
  { cart }: CreateOrderPayload
): Promise<Order> {
  // Obtener información de los productos del carrito
  const productSnapshots = await Promise.all(
    cart.products.map(async (item) => {
      const product = await productService.findById(item.productId);
      if (!product) throw new Error(`Product ${item.productId} not found`);

      return {
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity: item.quantity,
        subtotal: item.subtotal,
        variant: item.variantId
          ? { id: item.variantId, attribute: "Color Azul" } // buscar si querés
          : undefined,
        discountApplied: item.discountApplied
          ? {
              ...item.discountApplied,
              // opcional: si querés asegurarte de tener snapshot completo
              active: item.discountApplied.active ?? true,
              dateFrom: item.discountApplied.dateFrom ?? new Date(),
              dateTo: item.discountApplied.dateTo ?? new Date(),
            }
          : undefined,
      };
    })
  );

  const order: Order = {
    id: crypto.randomUUID(),
    userId: cart.userId,
    products: productSnapshots,
    total: cart.total, // se guarda el total actual del carrito
    state: State.PENDING,
    date: new Date(),
  };

  await orderService.create(order);

  return order;
}
