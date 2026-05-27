//Denifición de endopoints
//Este archivo SOLO conecta rutas con controllers

import { Router } from "express";
import { createUserController } from "@presentation/controllers/user.controller.js";


const router = Router();

router.post("/create", createUserController);
// router.get("/", getCategoryController);
// router.get("/getById/:id", getCategoryByIdController);
// router.delete("/delete/:id", deleteCategoryController);
// router.put("/update/:id", updateCategoryController);

export default router;