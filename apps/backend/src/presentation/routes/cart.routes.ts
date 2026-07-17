//Denifición de endopoints
//Este archivo SOLO conecta rutas con controllers

import { Router } from "express";
import { authMiddleware } from "@presentation/controllers/middleware/index.js";
import { createCartController, getCartsController } from "@presentation/controllers/cart.controller.js";

const router = Router();

//protected
router.get("/", authMiddleware, getCartsController);
// router.get("/getById/:id", getCartByIdController);
router.post("/create", authMiddleware, createCartController);
// router.delete("/delete/:id", authMiddleware, deleteCartController);
// router.patch("/update/:id", authMiddleware, updateCartController);

export default router;