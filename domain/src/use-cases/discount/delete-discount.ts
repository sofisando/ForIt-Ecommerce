import { Discount } from "../../entities";
import { DiscountService } from "../../services";
import { DeletePayload } from "../../utils/types/payload";

interface DeleteDiscountDeps {
  discountService: DiscountService;
}

type DeleteDiscountPayload = DeletePayload<Discount>

export async function deleteDiscount(
  { discountService }: DeleteDiscountDeps,
  { id }: DeleteDiscountPayload
) : Promise<void> {
  const foundDiscount = await discountService.findById(id);
  if (!foundDiscount) throw new Error("Discount not found");

  await discountService.delete({id});
}