import { Request, Response } from "express";
import { prisma } from "@infra/prisma/prisma.js";

import { UserRepositoryPrisma } from "@infra/repos/index.js";
import { CreateUserDTO } from "@app/DTOs/index.js";
import { UserAlreadyExistsError } from "@forit/domain";
import { createUser } from "@app/use-cases/index.js";

const db = prisma;
const userRepository = new UserRepositoryPrisma(db);

export const createUserController = async (req: Request, res: Response) => {
  const dto: CreateUserDTO = req.body;

  try {
    const user = await createUser(
      {
        userRepository,
      },
      dto ,
    );

    res.status(201).json(user);
  } catch (error: any) {
    console.error(error);
    if (error instanceof UserAlreadyExistsError) {
      return res.status(409).json({ message: "User already exists" });
    }

    // 🔥 después podés mejorar esto con error handling centralizado
    res.status(500).json({
      message: "Error creating user",
    });
  }
};

// export const getUserController = async (req: Request, res: Response) => {
//   const dto: GetCategoryDTO = {};

//   if (typeof req.query.search === "string") {
//     dto.search = req.query.search;
//   }

//   try {
//     const categories = await getCategories(
//       {
//         userRepository,
//       },
//       dto,
//     );

//     res.status(200).json(categories);
//   } catch (error: unknown) {
//     console.error(error);

//     res.status(500).json({
//       message: "Error fetching categories",
//     });
//   }
// };

// export const getCategoryByIdController = async (req: Request, res: Response) => {
//   if (!req.params.id) {
//     return res.status(400).json({ message: "Id is required" });
//   }
//   const dto: GetCategoryByIdDTO = {
//     id: req.params.id,
//   };

//   try {
//     const category = await getCategoryById({ userRepository }, dto);
//     res.status(200).json(category);
//   } catch (error: any) {
//     console.error(error);
//     if (error instanceof CategoryNotFoundError) {
//       return res.status(404).json({ message: "Category not found" });
//     }
//     res.status(500).json({
//       message: "Error fetching category",
//     });
//   }
// };

// //borra si no el id de la categoria no esta siendo usada en algun producto
// export const deleteCategoryController = async (req: Request, res: Response) => {
//   if (!req.params.id) {
//     return res.status(400).json({ message: "Id is required" });
//   }
//   const dto: DeleteCategoryDTO = {
//     id: req.params.id,
//   };

//   try {
//     await deleteCategory({ userRepository }, {dto});
//     res.status(204).send();
//   } catch (error: any) {
//     console.error(error);
//     if (error instanceof CategoryNotFoundError) {
//       return res.status(404).json({ message: "Category not found" });
//     }
//     res.status(500).json({
//       message: "Error deleting category",
//     });
//   }
// };

// export const updateCategoryController = async (req: Request, res: Response) => {
//   if (!req.params.id) {
//     return res.status(400).json({ message: "Id is required" });
//   }

//   const id = req.params.id;
//   const dto: UpdateCategoryDTO = req.body;

//   try {
//     const updatedCategory = await updateCategory({ userRepository }, {id, dto});
//     res.status(200).json(updatedCategory);
//   } catch (error: any) {
//     console.error(error);
//     if (error instanceof CategoryNotFoundError) {
//       return res.status(404).json({ message: "Category not found" });
//     }
//     res.status(500).json({
//       message: "Error updating category",
//     });
//   }
// };