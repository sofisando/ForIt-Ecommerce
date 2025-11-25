import { OrderService } from "../../services/order-service";

interface GetOrderListDeps {
    orderService: OrderService;
}

export async function getOrderList({ orderService }: GetOrderListDeps) {
    const orders = await orderService.findAll();
    return orders;
}