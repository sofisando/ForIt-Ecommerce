//Denifición de endopoints
//Este archivo SOLO conecta rutas con controllers

import { Router } from "express";
import { createCategoryController, getCategoryController, updateCategoryController } from "@presentation/controllers/category.controller.js";


const router = Router();

router.post("/create", createCategoryController);
router.get("/", getCategoryController);
// router.get("/getById/:id", getProductByIdController);
// router.delete("/delete/:id", deleteProductController);
router.put("/update/:id", updateCategoryController);

export default router;