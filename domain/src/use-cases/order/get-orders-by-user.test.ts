import { describe, test, expect} from "vitest";
import { MockedOrderService } from "../../services/mocks/mock-order-service";
import { orderMock } from "../../entities/mocks/order-mock";
import { getOrdersByUserId } from "./get-orders-by-user";


describe("getOrdersByUserId", async() => {
    test("Should return a array of orders filtered by user", async () => {
        const orderService = new MockedOrderService([
            orderMock({ userId: "1" }),
            orderMock({ userId: "1" }),
            orderMock({ userId: "2" }),
        ]);
        const result = await getOrdersByUserId(
            { orderService },
            { userId: "1" }
        );
        expect(result).toHaveLength(2);
        expect(result[0]!.userId).toBe("1");
    });
    test("if there are no orders to user you should return an empty list", async () => {;
        const orderService = new MockedOrderService([])
        const result = await getOrdersByUserId(
            { orderService },
            { userId: "99999" }
        );
        expect(result).toHaveLength(0);
        expect(result).toStrictEqual([]);
    });
});