import { Request, Response } from "express";
import { ProductRepositoryPrisma } from "../../infra/repos/product-repo-implementation.js";
import { prisma } from "../../infra/prisma/prisma.js";
import { CreateProductDTO } from "src/application/use-cases/DTOs/create-product.dto.js";
import { createProduct } from "../../application/use-cases/create-product.js";

const db = prisma;
const productRepository = new ProductRepositoryPrisma(db);

export const createProductController = async (req: Request, res: Response) => {
  const dto: CreateProductDTO = req.body;

  try {
    const product = await createProduct(
      {
        productRepository,
        // userRepository
      },
      dto
    );

    res.status(201).json(product);
  } catch (error: any) {
    console.error(error);

    // 🔥 después podés mejorar esto con error handling centralizado
    res.status(500).json({
      message: "Error creating product",
    });
  }
};

export const getAllProductsController = async (req: Request, res: Response) => {
  try {
    const products = await productRepository.getAll();
    res.status(200).json(products);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      message: "Error fetching products",
    });
  }
};