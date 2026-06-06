import { Request, Response } from "express";
import { prisma } from "@infra/prisma/prisma.js";

import { CategoryRepositoryPrisma } from "@infra/repos/index.js";
import {
  CreateCategoryDTO,
  DeleteCategoryDTO,
  GetCategoryByIdDTO,
  GetCategoryDTO,
  UpdateCategoryDTO,
} from "@app/DTOs/index.js";
import {
  CategoryAlreadyExistsError,
  CategoryNotFoundError,
  UnauthorizedError,
} from "@forit/domain";
import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategoryById,
  updateCategory,
} from "@app/use-cases/index.js";

const db = prisma;
const categoryRepository = new CategoryRepositoryPrisma(db);

export const getCategoryController = async (req: Request, res: Response) => {
  const dto: GetCategoryDTO = {};

  if (typeof req.query.search === "string") {
    dto.search = req.query.search;
  }

  try {
    const categories = await getCategories(
      {
        categoryRepository,
      },
      dto,
    );

    res.status(200).json(categories);
  } catch (error: unknown) {
    console.error(error);

    res.status(500).json({
      message: "Error fetching categories",
    });
  }
};

export const getCategoryByIdController = async (
  req: Request,
  res: Response,
) => {
  if (!req.params.id) {
    return res.status(400).json({ message: "Id is required" });
  }
  const dto: GetCategoryByIdDTO = {
    id: String(req.params.id),
  };

  try {
    const category = await getCategoryById({ categoryRepository }, dto);
    res.status(200).json(category);
  } catch (error: any) {
    console.error(error);
    if (error instanceof CategoryNotFoundError) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(500).json({
      message: "Error fetching category",
    });
  }
};

//------------------------- # protected endpoints # ------------------------

export const createCategoryController = async (req: Request, res: Response) => {
  const actor = req.user;

  if (!actor) {
    return res.status(401).json({
      message: "Unauthorized - token not found",
    });
  }
  const dto: CreateCategoryDTO = req.body;

  try {
    const category = await createCategory(
      {
        categoryRepository,
      },
      { actor, dto },
    );

    res.status(201).json(category);
  } catch (error: any) {
    console.error(error);
    if (error instanceof UnauthorizedError) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    if (error instanceof CategoryAlreadyExistsError) {
      return res.status(409).json({ message: "Category already exists" });
    }

    // 🔥 después podés mejorar esto con error handling centralizado
    res.status(500).json({
      message: "Error creating category",
    });
  }
};

//borra si no el id de la categoria no esta siendo usada en algun producto
export const deleteCategoryController = async (req: Request, res: Response) => {
  const actor = req.user;

  if (!actor) {
    return res.status(401).json({
      message: "Unauthorized - token not found",
    });
  }
  if (!req.params.id) {
    return res.status(400).json({ message: "Id is required" });
  }
  const dto: DeleteCategoryDTO = {
    id: String(req.params.id),
  };

  try {
    await deleteCategory({ categoryRepository }, { actor, dto });
    res.status(204).send();
  } catch (error: any) {
    console.error(error);
    if (error instanceof UnauthorizedError) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    if (error instanceof CategoryNotFoundError) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(500).json({
      message: "Error deleting category",
    });
  }
};

export const updateCategoryController = async (req: Request, res: Response) => {
  const actor = req.user;

  if (!actor) {
    return res.status(401).json({
      message: "Unauthorized - token not found",
    });
  }
  if (!req.params.id) {
    return res.status(400).json({ message: "Id is required" });
  }

  const id = String(req.params.id);
  const dto: UpdateCategoryDTO = req.body;

  try {
    const updatedCategory = await updateCategory(
      { categoryRepository },
      { actor, id, dto },
    );
    res.status(200).json(updatedCategory);
  } catch (error: any) {
    console.error(error);
    if (error instanceof UnauthorizedError) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    if (error instanceof CategoryNotFoundError) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(500).json({
      message: "Error updating category",
    });
  }
};
