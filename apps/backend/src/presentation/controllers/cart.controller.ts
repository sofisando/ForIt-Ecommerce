import { Request, Response } from "express";
import { prisma } from "@infra/prisma/prisma.js";
import { CartAlreadyExistsError, ProductNotFoundError, UnauthorizedError } from "@forit/domain";
import { CreateCartDTO } from "@app/DTOs/index.js";
import { CartRepositoryPrisma } from "@infra/repos/index.js";
import { createCart } from "@app/use-cases/index.js";

const db = prisma;
const cartRepository = new CartRepositoryPrisma(db);

// export const getCartsController = async (req: Request, res: Response) => {
//   const dto: GetCartsDTO = {};

//   if (typeof req.query.search === "string") {
//     dto.search = req.query.search;
//   }

//   if (typeof req.query.categoryId === "string") {
//     dto.categoryId = req.query.categoryId;
//   }

//   if (typeof req.query.minPrice === "string") {
//     const minPrice = Number(req.query.minPrice);

//     if (!Number.isNaN(minPrice)) {
//       dto.minPrice = minPrice;
//     }
//   }

//   if (typeof req.query.maxPrice === "string") {
//     const maxPrice = Number(req.query.maxPrice);

//     if (!Number.isNaN(maxPrice)) {
//       dto.maxPrice = maxPrice;
//     }
//   }

//   try {
//     const carts = await getProducts(
//       {
//         cartRepository,
//       },
//       dto,
//     );

//     res.status(200).json(carts);
//   } catch (error: unknown) {
//     console.error(error);

//     res.status(500).json({
//       message: "Error fetching carts",
//     });
//   }
// };

// export const getProductByIdController = async (req: Request, res: Response) => {
//   if (!req.params.id) {
//     return res.status(400).json({ message: "Id is required" });
//   }
//   const dto: GetProductByIdDTO = {
//     id: String(req.params.id),
//   };

//   try {
//     const cart = await getProductById({ cartRepository }, dto);
//     res.status(200).json(cart);
//   } catch (error: any) {
//     console.error(error);
//     if (error instanceof ProductNotFoundError) {
//       return res.status(404).json({ message: "Product not found" });
//     }
//     res.status(500).json({
//       message: "Error fetching cart",
//     });
//   }
// };

// --------------------------- # protected endpoints # ------------------------------

export const createCartController = async (req: Request, res: Response) => {
  const actor = req.user;

  if (!actor) {
    return res.status(401).json({
      message: "Unauthorized - token not found",
    });
  }
  const dto: CreateCartDTO = req.body;

  try {
    const cart = await createCart(
      {
        cartRepository,
      },
      { actor, dto },
    );

    res.status(201).json(cart);
  } catch (error: any) {
    if (error instanceof UnauthorizedError) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    if (error instanceof CartAlreadyExistsError) {
      return res.status(409).json({ message: "Cart already exist" });
    }
    console.error(error);

    // 🔥 después podés mejorar esto con error handling centralizado
    res.status(500).json({
      message: "Error creating cart",
    });
  }
};

// export const deleteProductController = async (req: Request, res: Response) => {
//   const actor = req.user;

//   if (!actor) {
//     return res.status(401).json({
//       message: "Unauthorized - token not found",
//     });
//   }
//   if (!req.params.id) {
//     return res.status(400).json({ message: "Id is required" });
//   }
//   const dto: DeleteProductDTO = {
//     id: String(req.params.id),
//   };

//   try {
//     await deleteProduct({ cartRepository }, { actor, dto });
//     res.status(204).send();
//   } catch (error: any) {
//     console.error(error);
//     if (error instanceof UnauthorizedError) {
//       return res.status(401).json({ message: "Unauthorized" });
//     }
//     if (error instanceof ProductNotFoundError) {
//       return res.status(404).json({ message: "Product not found" });
//     }
//     res.status(500).json({
//       message: "Error deleting cart",
//     });
//   }
// };

// export const updateProductController = async (req: Request, res: Response) => {
//   const actor = req.user;

//   if (!actor) {
//     return res.status(401).json({
//       message: "Unauthorized - token not found",
//     });
//   }
//   if (!req.params.id) {
//     return res.status(400).json({ message: "Id is required" });
//   }

//   const id = String(req.params.id);
//   const dto: UpdateProductDTO = req.body;

//   try {
//     const updatedProduct = await updateProduct(
//       { cartRepository },
//       { actor, id, dto },
//     );
//     res.status(200).json(updatedProduct);
//   } catch (error: any) {
//     console.error(error);
//     if (error instanceof UnauthorizedError) {
//       return res.status(401).json({ message: "Unauthorized" });
//     }
//     if (error instanceof ProductNotFoundError) {
//       return res.status(404).json({ message: "Product not found" });
//     }
//     res.status(500).json({
//       message: "Error updating cart",
//     });
//   }
// };
