//Denifición de endopoints
//Este archivo SOLO conecta rutas con controllers

import { Router } from "express";
import { createProductController, deleteProductController, getAllProductsController, getProductByIdController } from "../controllers/product.controller.js";

const router = Router();

router.post("/createProduct", createProductController);
router.get("/getAllProducts", getAllProductsController);
router.get("/getProductById/:id", getProductByIdController);
router.delete("/deleteProduct/:id", deleteProductController);

export default router;