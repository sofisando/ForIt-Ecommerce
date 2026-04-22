import { Product } from "@forit/domain";
import { Product as PrismaProduct } from "@prisma/client";

export class ProductMapper {
  static toDomain(prismaProduct: PrismaProduct): Product {
    return new Product(
      prismaProduct.id,
      prismaProduct.name,
      prismaProduct.description,
      prismaProduct.imageUrl,
      prismaProduct.price,
      prismaProduct.categoryId
    );
  }

  static toPrisma(product: Product) {
    return {
      id: product.id,
      name: product.name,
      description: product.description,
      imageUrl: product.imageUrl,
      price: product.price,
      categoryId: product.categoryId,
    };
  }
}