//Denifición de endopoints
//Este archivo SOLO conecta rutas con controllers

import { Router } from "express";
import { createProductController } from "../controllers/product.controller.js";

const router = Router();

router.post("/createProduct", createProductController);

export default router;