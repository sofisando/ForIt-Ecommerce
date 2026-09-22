//Denifición de endopoints
//Este archivo SOLO conecta rutas con controllers

import { Router } from "express";
import { createCategoryController, deleteCategoryController, getCategoryByIdController, getCategoryController, updateCategoryController } from "@presentation/controllers/category.controller.js";
import { authMiddleware } from "@presentation/controllers/middleware/auth.middleware.js";

const router = Router();

router.get("/", getCategoryController);
router.get("/getById/:id", getCategoryByIdController);

//protected
router.post("/create", authMiddleware, createCategoryController);
router.delete("/delete/:id", authMiddleware, deleteCategoryController);
router.patch("/update/:id", authMiddleware, updateCategoryController);

export default router;