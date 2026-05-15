import { PrismaClient } from "@infra/generated/prisma/client.js";
import { Product, ProductRepository } from "@forit/domain";
import { ProductMapper } from '@infra/mappers/index.js';

export class ProductRepositoryPrisma implements ProductRepository {
  private db: PrismaClient;

  constructor(db: PrismaClient) { //acá va el tipo de PrismaClient
    this.db = db;
  }

  async getById(id: string): Promise<Product | null> {
    const result = await this.db.product.findUnique({
      where: { id },
    });

    if (!result) return null;

    return ProductMapper.toDomain(result);
  }

  async getAll(filters: any): Promise<Product[]> {
    const results = await this.db.product.findMany({
      where: filters,
    });

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

}
