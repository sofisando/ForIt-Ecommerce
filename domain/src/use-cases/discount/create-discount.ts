import type { Discount } from "../../entities/discount.js";
import { User, UserRole } from "../../entities/user.js";
import type { DiscountService, UserService } from "../../services/";
import type { CreatePayload } from "../../utils/types/payload.js";

interface CreateDiscountDeps {
  discountService: DiscountService;
  userService: UserService;
}

type CreateDiscountPayload = {
  userId: User["id"];
  data: CreatePayload<Discount>;
};

export async function createDiscount(
  { discountService, userService }: CreateDiscountDeps,
  { userId, data }: CreateDiscountPayload
): Promise<Discount | Error> {
  const user = await userService.findById(userId);
  if (!user) return new Error(`User ${userId} not found`);

  if (user.role !== UserRole.ADMIN) {
    return new Error(`User is not ${UserRole.ADMIN}`);
  }
  const foundDiscountName = await discountService.findByName(data.name);
  if (foundDiscountName)
    return new Error(`Name ${data.name} is already created`);

  const discount = await discountService.create(data);

  return discount;
}
