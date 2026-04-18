import { PrismaClient } from "@prisma/client";
import { Product, ProductRepository } from "@forit/domain";
import { Product as PrismaProduct } from "@prisma/client";

export class ProductRepositoryPrisma implements ProductRepository {
  private db: PrismaClient;

  constructor(db: PrismaClient) {
    this.db = db;
  }

  async getById(id: string): Promise<Product | null> {
    const result = await this.db.product.findUnique({
      where: { id },
    });

    if (!result) return null;

    return this.toDomain(result);
  }

  async getAll(): Promise<Product[]> {
    const results = await this.db.product.findMany();

    return results.map(this.toDomain);
  }

  async save(product: Product): Promise<void> {
    const data = this.toPrisma(product);

    await this.db.product.upsert({
      where: { id: product.id },
      create: data,
      update: data,
    });
  }

  async delete(id: string): Promise<void> {
    await this.db.product.delete({
      where: { id },
    });
  }

  async getProductsByCategory(categoryId: string): Promise<Product[]> {
    const results = await this.db.product.findMany({
      where: { categoryId },
    });

    return results.map(this.toDomain);
  }

  async getProductsSearch(query: string): Promise<Product[]> {
    const results = await this.db.product.findMany({
      where: {
        name: {
          contains: query,
          mode: "insensitive",
        },
      },
    });

    return results.map(this.toDomain);
  }

  // 🔥 MAPPERS

  private toDomain(prismaProduct: PrismaProduct): Product {
  return new Product(
    prismaProduct.id,
    prismaProduct.name,
    prismaProduct.description,
    prismaProduct.imageUrl,
    prismaProduct.price,
    prismaProduct.categoryId
  );
}

  private toPrisma(product: Product) {
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
