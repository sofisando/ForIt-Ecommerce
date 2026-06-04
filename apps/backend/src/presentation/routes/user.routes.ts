//Denifición de endopoints
//Este archivo SOLO conecta rutas con controllers

import { Router } from "express";
import { createUserController, deleteUserController, getUserByIdController, getUserController, loginUserController, updateUserController } from "@presentation/controllers/user.controller.js";


const router = Router();

router.post("/register", createUserController);
router.post("/login", loginUserController);
// router.post("/logout", logoutUserController);
// router.get("/protected", protectedUserController);

router.get("/", getUserController);
router.get("/getById/:id", getUserByIdController);
router.delete("/delete/:id", deleteUserController);
router.patch("/update/:id", updateUserController);

export default router;