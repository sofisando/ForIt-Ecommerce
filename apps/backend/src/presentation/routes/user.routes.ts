//Denifición de endopoints
//Este archivo SOLO conecta rutas con controllers

import { Router } from "express";
import { createUserController, deleteUserController, getUserByIdController, getUserController, updateUserController } from "@presentation/controllers/user.controller.js";


const router = Router();

router.post("/create", createUserController);
router.get("/", getUserController);
router.get("/getById/:id", getUserByIdController);
router.delete("/delete/:id", deleteUserController);
router.put("/update/:id", updateUserController);

export default router;