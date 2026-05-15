//Denifición de endopoints
//Este archivo SOLO conecta rutas con controllers

import { Router } from "express";
import { createProductController, deleteProductController, getProductByIdController, getProductsController, updateProductController } from "../controllers/product.controller.js";

const router = Router();

router.post("/create", createProductController);
router.get("/", getProductsController);
router.get("/getById/:id", getProductByIdController);
router.delete("/delete/:id", deleteProductController);
router.put("/update/:id", updateProductController);

export default router;