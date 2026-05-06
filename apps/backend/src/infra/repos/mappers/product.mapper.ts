import { Product } from "@forit/domain";
import { Money } from "@forit/domain/dist/ValueObjects/Money.js";
import { Product as PrismaProduct } from "../../generated/prisma/client.js";
import { Decimal } from "src/infra/generated/prisma/internal/prismaNamespace.js";

export class ProductMapper {
  static toDomain(prismaProduct: PrismaProduct): Product {
    return new Product(
      prismaProduct.id,
      prismaProduct.name,
      prismaProduct.description,
      prismaProduct.imageUrl,
      new Money(prismaProduct.price.toNumber()),
      prismaProduct.categoryId
    );
  }

  static toPrisma(product: Product) {
    return {
      id: product.id,
      name: product.name,
      description: product.description,
      imageUrl: product.imageUrl,
      price: new Decimal(product.price.toNumber()),
      categoryId: product.categoryId,
    };
  }
}