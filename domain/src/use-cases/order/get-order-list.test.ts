import { describe, test, expect} from "vitest";
import { MockedOrderService } from "../../services/mocks/mock-order-service";
import { orderMock } from "../../entities/mocks/order-mock";
import { getOrderList } from "./get-order-list";


describe("getOrderList", async() => {
    test("Should return a array of orders", async () => {
        const orderService = new MockedOrderService([
            orderMock(),
            orderMock()
        ]) //acá ejecutamos el constructor del Mock de servicio y le metemos Mocks de usuario
        const result = await getOrderList(
            { orderService }
        );
        expect(result).toHaveLength(2);
        expect(result).toStrictEqual(orderService.orders);
    });
    test("if there are no orders you should return an empty list", async () => {;
        const orderService = new MockedOrderService([])
        const result = await getOrderList(
            { orderService }
        );
        expect(result).toHaveLength(0);
        expect(result).toStrictEqual([]);
    });
});