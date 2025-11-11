import { describe, test, expect} from "vitest";
import { MockedCartService } from "../../services/mocks/mock-cart-service";
import { cartMock } from "../../entities/mocks/cart-mock";
import { getCartList } from "./get-cart-list";


describe("getCartList", async() => {
    test("Should return a array of carts", async () => {
        const cartService = new MockedCartService([
            cartMock(),
            cartMock()
        ]) //acá ejecutamos el constructor del Mock de servicio y le metemos Mocks de usuario
        const result = await getCartList(
            { cartService }
        );
        expect(result).toHaveLength(2);
        expect(result).toStrictEqual(cartService.carts);
    });
    test("if there are no carts you should return an empty list", async () => {;
        const cartService = new MockedCartService([])
        const result = await getCartList(
            { cartService }
        );
        expect(result).toHaveLength(0);
        expect(result).toStrictEqual([]);
    });
});