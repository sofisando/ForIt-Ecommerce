import { Request, Response } from "express";
import { prisma } from "@infra/prisma/prisma.js";
import {
  CartAlreadyExistsError,
  UnauthorizedError,
} from "@forit/domain";
import { CartRepositoryPrisma } from "@infra/repos/index.js";
import { createCart, getCarts } from "@app/use-cases/index.js";

const db = prisma;
const cartRepository = new CartRepositoryPrisma(db);

export const getCartsController = async (req: Request, res: Response) => {
  const actor = req.user;

  if (!actor) {
    return res.status(401).json({
      message: "Unauthorized - token not found",
    });
  }
  try {
    const carts = await getCarts(
      {
        cartRepository,
      },
      { actor },
    );

    res.status(200).json(carts);
  } catch (error: any) {
    if (error instanceof UnauthorizedError) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    console.error(error);

    res.status(500).json({
      message: "Error fetching carts",
    });
  }
};

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

  try {
    const cart = await createCart(
      {
        cartRepository,
      },
      { actor },
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
