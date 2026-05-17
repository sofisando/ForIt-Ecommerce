import { PrismaClient } from "@infra/generated/prisma/client.js"
import { Category, CategoryRepository } from "@forit/domain";
import { CategoryMapper } from '@infra/mappers/index.js';

export class CategoryRepositoryPrisma implements CategoryRepository {
  private db: PrismaClient;

  constructor(db: PrismaClient) {
    this.db = db;
  }

  async getById(id: string): Promise<Category | null> {
    const result = await this.db.category.findUnique({
      where: { id },
    });

    if (!result) return null;

    return CategoryMapper.toDomain(result);
  }

  async getAll(): Promise<Category[]> {
    const results = await this.db.category.findMany();

    return results.map(CategoryMapper.toDomain);
  }

  async save(category: Category): Promise<void> {
    const data = CategoryMapper.toPrisma(category);

    await this.db.category.upsert({
      where: { id: category.id },
      create: data,
      update: data,
    });
  }

  async delete(id: string): Promise<void> {
    await this.db.category.delete({
      where: { id },
    });
  }

  async findByName(name: string): Promise<Category | undefined> {
    const result = await this.db.category.findUnique({
      where: { name },
    });

    if (!result) return undefined;

    return CategoryMapper.toDomain(result);
  }
}
