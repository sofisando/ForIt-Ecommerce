//Denifición de endopoints
//Este archivo SOLO conecta rutas con controllers

import { Router } from "express";
import { createUserController, deleteUserController, getUserByIdController, getUserController, loginUserController, logoutUserController, updateUserController } from "@presentation/controllers/user.controller.js";
import { authMiddleware } from "@presentation/controllers/middleware/index.js";

const router = Router();

router.post("/register", createUserController);
router.post("/login", loginUserController);
router.post("/logout", logoutUserController);

//protegidas
router.get("/", authMiddleware, getUserController);
router.get("/getById/:id", authMiddleware, getUserByIdController);
router.delete("/delete/:id", authMiddleware, deleteUserController);
router.patch("/update/:id", authMiddleware, updateUserController);

export default router;