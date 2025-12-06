import { Product, User, UserRole } from "../../entities";
import type { ProductService, UserService } from "../../services";
import type { UpdatePayload } from "../../utils/types/payload";

interface EditProductDeps {
  productService: ProductService;
  userService: UserService;
}

type EditProductPayload = {
  userId: User["id"];
  data: UpdatePayload<Product>;
};

export async function editProduct(
  { productService, userService }: EditProductDeps,
  payload: EditProductPayload
): Promise<Product | Error> {
  const user = await userService.findById(payload.userId);
  if (!user) return new Error(`User ${payload.userId} not found`);

  if (user.role !== UserRole.ADMIN) {
    return new Error(`User is not ${UserRole.ADMIN}`);
  }

  const existing = await productService.findById(payload.data.id);
  if (!existing) return new Error("Product not found");

  const updated = await productService.editOne(payload.data);
  return updated;
}
