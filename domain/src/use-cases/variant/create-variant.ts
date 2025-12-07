import { User, UserRole } from "../../entities/user.js";
import type { Variant } from "../../entities/variant.js";
import type { UserService, VariantService } from "../../services";
import type { CreatePayload } from "../../utils/types/payload.js";

interface CreateVariantDeps {
  variantService: VariantService;
  userService: UserService;
}

type CreateVariantPayload = {
  userId: User["id"];
  data: CreatePayload<Variant>;
};

export async function createVariant(
  { variantService, userService }: CreateVariantDeps,
  { userId, data }: CreateVariantPayload
): Promise<Variant | Error> {
  const user = await userService.findById(userId);
  if (!user) return new Error(`User ${userId} not found`);

  if (user.role !== UserRole.ADMIN) {
    return new Error(`User is not ${UserRole.ADMIN}`);
  }
  const found = await variantService.findByAttribute(
    data.productId,
    data.attribute.title,
    data.attribute.name
  );

  if (found) {
    return new Error(
      `Variant ${data.attribute.title}: ${data.attribute.name} already exists for this product`
    );
  }

  return await variantService.create(data);
}
