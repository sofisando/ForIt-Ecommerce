import { VariantService } from "../../services";

interface GetVariantListDeps {
  variantService: VariantService;
}

export async function getVariantList({ variantService }: GetVariantListDeps) {
  const variants = await variantService.findAll();
  return variants;
}
