//VER----------

import { prisma } from "src/lib/prisma.js";
import type { DiscountService } from "@forit/domain/";
import type { Discount } from "@forit/domain/";

export const prismaDiscountService: DiscountService = {
  async getActiveDiscounts(): Promise<Discount[]> {
    const now = new Date();

    const discountsFromDb = await prisma.discount.findMany({
      where: {
        active: true,
        dateFrom: { lte: now },
        dateTo: { gte: now },
      },
      include: {
        products: { select: { id: true } },
        categories: { select: { id: true } },
      },
    });

    return discountsFromDb.map((d) => ({
      id: d.id,
      name: d.name,
      type: d.type,
      value: d.value,
      productsApplied: d.products.map((p) => p.id),
      categoriesApplied: d.categories.map((c) => c.id),
    }));
  },

  async findByName(name: string): Promise<Discount | undefined> {
    const discount = await prisma.discount.findFirst({
      where: { name },
      include: {
        products: { select: { id: true } },
        categories: { select: { id: true } },
      },
    });

    if (!discount) return undefined;

    return {
      id: discount.id,
      name: discount.name,
      type: discount.type,
      value: discount.value,
      productsApplied: discount.products.map((p) => p.id),
      categoriesApplied: discount.categories.map((c) => c.id),
    };
  },

  // si tu Service base lo pide:
  async findById(id: string): Promise<Discount | undefined> {
    // mismo patrón
    return undefined;
  },
};
