//Denifición de endopoints
//Este archivo SOLO conecta rutas con controllers

import { Router } from "express";
import { createProductController, deleteProductController, getProductByIdController, getProductsController, updateProductController } from "../controllers/product.controller.js";
import { authMiddleware } from "@presentation/controllers/middleware/index.js";

const router = Router();

router.get("/", getProductsController);
router.get("/getById/:id", getProductByIdController);

//protected
router.post("/create", authMiddleware, createProductController);
router.delete("/delete/:id", authMiddleware, deleteProductController);
router.patch("/update/:id", authMiddleware, updateProductController);

export default router;