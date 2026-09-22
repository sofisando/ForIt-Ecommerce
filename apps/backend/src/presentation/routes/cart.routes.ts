//Denifición de endopoints
//Este archivo SOLO conecta rutas con controllers

import { Router } from "express";
import { authMiddleware } from "@presentation/controllers/middleware/index.js";
import { addItemToCartController, createCartController, getCartByUserIdController, getCartsController } from "@presentation/controllers/cart.controller.js";

const router = Router();

//protected
router.get("/", authMiddleware, getCartsController);
router.post("/create", authMiddleware, createCartController);
router.post("/addItem", authMiddleware, addItemToCartController);
router.get("/getByUserId", authMiddleware, getCartByUserIdController);

// router.get("/getById/:id", getCartByIdController);
// router.delete("/delete/:id", authMiddleware, deleteCartController);
// router.patch("/update/:id", authMiddleware, updateCartController);

export default router;