import { UserRole, type Discount, type User } from "../../entities";
import type { DiscountService, UserService } from "../../services";
import type { DeletePayload } from "../../utils/types/payload";

interface DeleteDiscountDeps {
  discountService: DiscountService;
  userService: UserService;
}

type DeleteDiscountPayload = DeletePayload<Discount> & {
  userId: User["id"];
};

export async function deleteDiscount(
  { discountService, userService }: DeleteDiscountDeps,
  { id, userId }: DeleteDiscountPayload
): Promise<void | Error> {
  const user = await userService.findById(userId);
  if (!user) return new Error(`User ${userId} not found`);

  if (user.role !== UserRole.ADMIN) {
    return new Error(`User is not ${UserRole.ADMIN}`);
  }
  const foundDiscount = await discountService.findById(id);
  if (!foundDiscount) return new Error("Discount not found");

  await discountService.delete({ id });
}
