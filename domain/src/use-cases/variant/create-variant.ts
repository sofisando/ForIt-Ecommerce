import { Variant } from "../../entities/variant.js";
import { VariantService } from "../../services/variant-service.js";

import type { CreatePayload } from "../../utils/types/payload.js";

interface CreateVariantDeps {
  variantService: VariantService;
}

type CreateVariantPayload = CreatePayload<Variant>;

export async function createVariant(
  { variantService }: CreateVariantDeps,
  payload: CreateVariantPayload
): Promise<Variant | Error> {
  const found = await variantService.findByAttribute(
    payload.productId,
    payload.attribute.title,
    payload.attribute.name
  );

  if (found) {
    return new Error(
      `Variant "${payload.attribute.title}: ${payload.attribute.name}" already exists for this product`
    );
  }

  return await variantService.create(payload);
}
