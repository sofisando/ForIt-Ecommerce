import { type User, UserRole, type Variant } from "../../entities";
import type { UserService, VariantService } from "../../services";

interface GetVariantListDeps {
  variantService: VariantService;
  userService: UserService;
}

interface GetVariantListPayload {
  userId: User["id"];
}

export async function getVariantList(
  { variantService, userService }: GetVariantListDeps,
  { userId }: GetVariantListPayload
): Promise<Variant[] | Error> {
  const user = await userService.findById(userId);
  if (!user) return new Error(`User ${userId} not found`);

  if (user.role !== UserRole.ADMIN) {
    return new Error(`User is not ${UserRole.ADMIN}`);
  }
  const variants = await variantService.findAll();
  return variants;
}
