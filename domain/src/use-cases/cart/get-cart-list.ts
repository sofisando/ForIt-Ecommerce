import { CartService } from "../../services/cart-service";

interface GetCartListDeps {
    cartService: CartService;
}

export async function getCartList({ cartService }: GetCartListDeps) {
    const carts = await cartService.findAll();
    return carts;
}