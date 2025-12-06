import { Product, User, UserRole } from "../../entities";
import type { ProductService, UserService } from "../../services";
import type { DeletePayload } from "../../utils/types/payload";

interface DeleteProductDeps {
  productService: ProductService;
  userService: UserService;
}

type DeleteProductPayload = DeletePayload<Product> & {
  userId: User["id"];
};

export async function deleteProduct(
  { productService, userService }: DeleteProductDeps,
  { id, userId }: DeleteProductPayload
): Promise<void | Error> {
  const user = await userService.findById(userId);
  if (!user) return new Error(`User ${userId} not found`);

  if (user.role !== UserRole.ADMIN) {
    return new Error(`User is not ${UserRole.ADMIN}`);
  }

  const foundProduct = await productService.findById(id);
  if (!foundProduct) return new Error("Product not found");

  await productService.delete({ id });
}
