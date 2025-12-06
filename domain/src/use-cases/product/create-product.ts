import { Product, User, UserRole } from "../../entities";
import type { ProductService, UserService } from "../../services";
import type { CreatePayload } from "../../utils/types/payload";

interface CreateProductDeps {
  productService: ProductService;
  userService: UserService;
}

type CreateProductPayload = {
  userId: User["id"];        // solo para validar
  data: CreatePayload<Product>; // datos reales del producto
};

export async function createProduct(
  { productService, userService }: CreateProductDeps,
  payload: CreateProductPayload
): Promise<Product | Error> {
  
  // 1. Verificás user
  const user = await userService.findById(payload.userId);
  if (!user) return new Error(`User ${payload.userId} not found`);

  if (user.role !== UserRole.ADMIN) {
    return new Error(`User is not ${UserRole.ADMIN}`);
  }
  // 2. Creás el producto con los datos que corresponden
  const product = await productService.create(payload.data);
  return product;
}
