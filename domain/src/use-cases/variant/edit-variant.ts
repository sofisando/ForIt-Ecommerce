import { type User, UserRole } from "../../entities";
import type { Variant } from "../../entities/variant";
import type { UserService, VariantService } from "../../services";
import type { UpdatePayload } from "../../utils/types/payload";

interface EditVariantDeps {
  variantService: VariantService;
  userService: UserService;
}

type EditVariantPayload = {
  userId: User["id"];
  data: UpdatePayload<Variant>;
};

export async function editVariant(
  { variantService, userService }: EditVariantDeps,
  { userId, data }: EditVariantPayload
): Promise<Variant | Error> {
  const user = await userService.findById(userId);
  if (!user) return new Error(`User ${userId} not found`);

  if (user.role !== UserRole.ADMIN) {
    return new Error(`User is not ${UserRole.ADMIN}`);
  }
  const existing = await variantService.findById(data.id);
  if (!existing) {
    return new Error("Variant not found");
  }

  const updated = await variantService.editOne(data);
  return updated;
}
