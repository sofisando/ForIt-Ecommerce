import { Variant } from "../../entities/variant";
import { VariantService } from "../../services/variant-service";
import { UpdatePayload } from "../../utils/types/payload";

interface EditVariantDeps {
  variantService: VariantService;
}

type EditVariantPayload = UpdatePayload<Variant>;

export async function editVariant(
  { variantService }: EditVariantDeps,
  payload: EditVariantPayload
): Promise<Variant | Error> {
  const existing = await variantService.findById(payload.id);
  if (!existing){
    return new Error("Variant not found");
  };

  const updated = await variantService.editOne(payload);
  return updated;
}
