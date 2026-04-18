import { Product, UserRole } from "@forit/domain";
import type { ProductRepository, UserRepository } from "@forit/domain";
import { UserNotFoundError, UnauthorizedError } from "@forit/domain";
import { CreateProductDTO } from "./DTOs/create-product.dto.js";

interface CreateProductDeps {
  productRepository: ProductRepository;
  // userRepository: UserRepository;
}

export async function createProduct(
  { productRepository }: CreateProductDeps,
  dto: CreateProductDTO
): Promise<Product> {

  // const user = await userRepository.getById(dto.userId);
  // if (!user) throw new UserNotFoundError();

  // if (user.role !== UserRole.ADMIN) {
  //   throw new UnauthorizedError();
  // }

  const product = new Product(
    crypto.randomUUID(),
    dto.name,
    dto.description,
    dto.imageUrl,
    dto.price,
    dto.categoryId
  );

  await productRepository.save(product);

  return product;
}