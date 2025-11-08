import { Discount } from "../../entities";
import { DiscountService } from "../../services";
import { UpdatePayload } from "../../utils/types/payload";

interface EditDiscountDeps {
  discountService: DiscountService;
}

type EditDiscountPayload = UpdatePayload<Discount>;

export async function editDiscount(
  { discountService }: EditDiscountDeps,
  payload: EditDiscountPayload
): Promise<Discount> {
  const existing = await discountService.findById(payload.id);
  if (!existing) throw new Error("Discount not found");

  const updated = await discountService.editOne(payload);
  return updated;
}
