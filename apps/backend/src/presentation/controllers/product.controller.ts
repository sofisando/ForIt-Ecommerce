import { Request, Response } from "express";
import { prisma } from "@infra/prisma/prisma.js";
import { ProductNotFoundError } from "@forit/domain";
import { CreateProductDTO, DeleteProductDTO, GetProductByIdDTO, UpdateProductDTO } from "@app/DTOs/index.js";
import { createProduct, deleteProduct, getAllProducts, getProductById, updateProduct } from "@app/use-cases/index.js";
import { ProductRepositoryPrisma } from "@infra/repos/index.js";

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
      dto,
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
    const products = await getAllProducts({
      productRepository,
    });
    res.status(200).json(products);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      message: "Error fetching products",
    });
  }
};

export const getProductByIdController = async (req: Request, res: Response) => {
  if (!req.params.id) {
    return res.status(400).json({ message: "Id is required" });
  }
  const dto: GetProductByIdDTO = {
    id: req.params.id,
  };

  try {
    const product = await getProductById({ productRepository }, dto);
    res.status(200).json(product);
  } catch (error: any) {
    console.error(error);
    if (error instanceof ProductNotFoundError) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(500).json({
      message: "Error fetching product",
    });
  }
};

export const deleteProductController = async (req: Request, res: Response) => {
  if (!req.params.id) {
    return res.status(400).json({ message: "Id is required" });
  }
  const dto: DeleteProductDTO = {
    id: req.params.id,
  };

  try {
    await deleteProduct({ productRepository }, dto);
    res.status(204).send();
  } catch (error: any) {
    console.error(error);
    if (error instanceof ProductNotFoundError) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(500).json({
      message: "Error deleting product",
    });
  }
};

export const updateProductController = async (req: Request, res: Response) => {
  if (!req.params.id) {
    return res.status(400).json({ message: "Id is required" });
  }

  const id = req.params.id;
  const dto: UpdateProductDTO = req.body;

  try {
    const updatedProduct = await updateProduct({ productRepository }, id, dto);
    res.status(200).json(updatedProduct);
  } catch (error: any) {
    console.error(error);
    if (error instanceof ProductNotFoundError) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(500).json({
      message: "Error updating product",
    });
  }
};
