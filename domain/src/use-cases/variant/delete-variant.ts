import { type User, UserRole } from "../../entities";
import type { Variant } from "../../entities/variant";
import type { UserService, VariantService } from "../../services";
import type { DeletePayload } from "../../utils/types/payload";

interface DeleteVariantDeps {
  variantService: VariantService;
  userService: UserService;
}

type DeleteVariantPayload = DeletePayload<Variant> & {
  userId: User["id"];
};

export async function deleteVariant(
  { variantService, userService }: DeleteVariantDeps,
  { id, userId }: DeleteVariantPayload
): Promise<void | Error> {
  const user = await userService.findById(userId);
  if (!user) return new Error(`User ${userId} not found`);

  if (user.role !== UserRole.ADMIN) {
    return new Error(`User is not ${UserRole.ADMIN}`);
  }
  const foundVariant = await variantService.findById(id);
  if (!foundVariant) {
    return new Error("Variant not found");
  }

  await variantService.delete({ id });
}
