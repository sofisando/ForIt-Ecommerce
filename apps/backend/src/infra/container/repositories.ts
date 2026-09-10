import { prisma } from "@infra/prisma/prisma.js";
import {
  CartRepositoryPrisma,
  ProductRepositoryPrisma,
} from "@infra/repos/index.js";

export const cartRepository = new CartRepositoryPrisma(prisma);
export const productRepository = new ProductRepositoryPrisma(prisma);