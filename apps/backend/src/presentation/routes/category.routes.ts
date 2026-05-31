//Denifición de endopoints
//Este archivo SOLO conecta rutas con controllers

import { Router } from "express";
import { createCategoryController, deleteCategoryController, getCategoryByIdController, getCategoryController, updateCategoryController } from "@presentation/controllers/category.controller.js";


const router = Router();

router.post("/create", createCategoryController);
router.get("/", getCategoryController);
router.get("/getById/:id", getCategoryByIdController);
router.delete("/delete/:id", deleteCategoryController);
router.patch("/update/:id", updateCategoryController);

export default router;