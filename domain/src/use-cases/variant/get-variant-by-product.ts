import { Variant } from "../../entities";
import { VariantService } from "../../services";

interface GetVariantsByProductDeps {
  variantService: VariantService;
}

interface GetVariantsByProductPayload {
  productId: string;
}

export async function getVariantByProduct(
  { variantService }: GetVariantsByProductDeps,
  { productId }: GetVariantsByProductPayload
): Promise<Variant[]> {
  const filteredVariants = await variantService.getVariantsByProduct(productId);

  return filteredVariants;
}
