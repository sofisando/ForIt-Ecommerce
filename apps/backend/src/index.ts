import express, { Request, Response } from "express";
import { prisma } from './lib/prisma.js'
import { ProductRepositoryPrisma } from  "./repos/product-repo-implementation.js";
import { CreateProductDTO } from "./use-cases/DTOs/create-product.dto.js";
import { createProduct } from "./use-cases/create-product.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const db = prisma;

const productRepository = new ProductRepositoryPrisma(db);

app.get("/test", async (req, res) => {
  console.log("➡️ test");

  const result = await prisma.product.findMany();

  console.log("✅ result:", result);

  res.json(result);
});

app.post("/createProduct", async (req: Request, res: Response) => {
  const dto: CreateProductDTO = req.body;

  try {
    const product = await createProduct(
      {
        productRepository,
        // userRepository,
      },
      dto
    );
    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// app.get("/getProduct/:id", async (req: Request, res: Response) => {
//   const id = req.params.id;

//   if (!id) return res.status(400).send("Missing data error");

//   const result = await getProvision({
//     dependencies: {
//       provisionService,
//     },
//     payload: { id },
//   });

//   console.log(result);

//   res.status(200).send("Todo OK!");
// });

app.listen(port, () => {
  console.log(`Servidor backend escuchando en http://localhost:${port}`);
});

export default app;
