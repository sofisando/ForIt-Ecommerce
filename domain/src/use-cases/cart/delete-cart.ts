import { Cart } from "../../entities/cart";
import { CartService } from "../../services/cart-service";
import { DeletePayload } from "../../utils/types/payload";

interface DeleteCartDeps {
  cartService: CartService;
}

type DeleteCartPayload = DeletePayload<Cart>

export async function deleteCart(
  { cartService }: DeleteCartDeps,
  { id }: DeleteCartPayload
) : Promise<void> {
  const foundCart = await cartService.findById(id);
  if (!foundCart) throw new Error("Cart not found");

  await cartService.delete({id});
}