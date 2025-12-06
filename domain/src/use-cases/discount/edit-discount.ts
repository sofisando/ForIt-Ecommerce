import { UserRole, type Discount, type User } from "../../entities";
import type { DiscountService, UserService } from "../../services";
import type { UpdatePayload } from "../../utils/types/payload";

interface EditDiscountDeps {
  discountService: DiscountService;
  userService: UserService;
}

type EditDiscountPayload = {
  userId: User["id"];
  data: UpdatePayload<Discount>;
};

export async function editDiscount(
  { discountService, userService }: EditDiscountDeps,
  { userId, data }: EditDiscountPayload
): Promise<Discount | Error> {
  const user = await userService.findById(userId);
  if (!user) return new Error(`User ${userId} not found`);

  if (user.role !== UserRole.ADMIN) {
    return new Error(`User is not ${UserRole.ADMIN}`);
  }
  const existing = await discountService.findById(data.id);
  if (!existing) return new Error("Discount not found");

  const updated = await discountService.editOne(data);
  return updated;
}
