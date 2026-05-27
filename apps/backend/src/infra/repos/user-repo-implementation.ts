import { User, UserRepository } from "@forit/domain";
import { PrismaClient } from "@infra/generated/prisma/client.js";
import { UserMapper } from '@infra/mappers/index.js';

export class UserRepositoryPrisma implements UserRepository {
  private db: PrismaClient;

  constructor(db: PrismaClient) { //acá va el tipo de PrismaClient
    this.db = db;
  }

  async getById(id: string): Promise<User | null> {
    const result = await this.db.user.findUnique({
      where: { id },
    });

    if (!result) return null;

    return UserMapper.toDomain(result);
  }

  async getAll(filters: any): Promise<User[]> {
    const results = await this.db.user.findMany({
      where: filters,
    });

    return results.map(UserMapper.toDomain);
  }

  async save(user: User): Promise<void> {
    const data = UserMapper.toPrisma(user);

    await this.db.user.upsert({
      where: { id: user.id },
      create: data,
      update: data,
    });
  }

  async delete(id: string): Promise<void> {
    await this.db.user.delete({
      where: { id },
    });
  }

  async findByEmail(email: string): Promise<User | undefined> {
      const result = await this.db.user.findUnique({
        where: { email },
      });
  
      if (!result) return undefined;
  
      return UserMapper.toDomain(result);
    }

}
