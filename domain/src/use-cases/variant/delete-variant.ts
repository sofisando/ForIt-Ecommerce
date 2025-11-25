import { Variant } from "../../entities/variant";
import { VariantService } from "../../services/variant-service";
import { DeletePayload } from "../../utils/types/payload";

interface DeleteVariantDeps {
  variantService: VariantService;
}

type DeleteVariantPayload = DeletePayload<Variant>

export async function deleteVariant(
  { variantService }: DeleteVariantDeps,
  { id }: DeleteVariantPayload
) : Promise<void | Error> {
  const foundVariant = await variantService.findById(id);
  if (!foundVariant) {
    return new Error("Variant not found");
  }

  await variantService.delete({id});
}