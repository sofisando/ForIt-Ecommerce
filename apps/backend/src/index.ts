import express from "express";
import productRoutes from "./presentation/routes/product.routes.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// 🔥 registrás rutas
app.use("/products", productRoutes); //se crea como blueprint

app.listen(port, () => {
  console.log(`Servidor backend escuchando en http://localhost:${port}`);
});

export default app;