import { Category } from "@forit/domain";
import { Category as PrismaCategory } from "@infra/generated/prisma/client.js";

export class CategoryMapper {
  static toDomain(PrismaCategory: PrismaCategory): Category {
    return new Category(
      PrismaCategory.id,
      PrismaCategory.name
    );
  }

  static toPrisma(category: Category) {
      return {
        id: category.id,
        name: category.name
      };
    }
}