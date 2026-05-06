// import { Product, User, UserRole } from "../../entities";
// import type { ProductService, UserService } from "../../services";
import { ProductNotFoundError, type ProductRepository } from "@forit/domain";
import { DeleteProductDTO } from "./DTOs/delete-product.dto.js";

interface DeleteProductDeps {
  productRepository: ProductRepository;
  //   userService: UserService;
}

export async function deleteProduct(
  {
    productRepository,
    // userService
  }: DeleteProductDeps,
  dto: DeleteProductDTO,
): Promise<void> {
  //   const user = await userService.findById(userId);
  //   if (!user) return new Error(`User ${userId} not found`);

  //   if (user.role !== UserRole.ADMIN) {
  //     return new Error(`User is not ${UserRole.ADMIN}`);
  //   }

  const product = await productRepository.getById(dto.id);
  if (!product) {
    throw new ProductNotFoundError();
  }

  await productRepository.delete(dto.id);
}
