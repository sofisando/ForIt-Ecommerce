import { PrismaClient } from "@prisma/client";
import { Product, ProductRepository } from "@forit/domain";
import { ProductMapper } from "./mappers/product-mapper.js"

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

    return ProductMapper.toDomain(result);
  }

  async getAll(): Promise<Product[]> {
    const results = await this.db.product.findMany();

    return results.map(ProductMapper.toDomain);
  }

  async save(product: Product): Promise<void> {
    const data = ProductMapper.toPrisma(product);

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

    return results.map(ProductMapper.toDomain);
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

    return results.map(ProductMapper.toDomain);
  }
}
