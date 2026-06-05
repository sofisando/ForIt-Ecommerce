//Denifición de endopoints
//Este archivo SOLO conecta rutas con controllers

import { Router } from "express";
import { createUserController, deleteUserController, getUserByIdController, getUserController, loginUserController, logoutUserController, updateUserController } from "@presentation/controllers/user.controller.js";
import { authMiddleware } from "@presentation/controllers/middleware/auth.middleware.js";


const router = Router();

router.post("/register", createUserController);
router.post("/login", loginUserController);
router.post("/logout", logoutUserController);

router.get("/", getUserController);
router.get("/getById/:id", getUserByIdController);
router.delete("/delete/:id", authMiddleware, deleteUserController);
router.patch("/update/:id", updateUserController);

export default router;