import express from "express";
import cookieParser from "cookie-parser";
import productRoutes from "./presentation/routes/product.routes.js";
import categoryRoutes from "./presentation/routes/category.routes.js";
import userRoutes from "./presentation/routes/user.routes.js";
import cartRoutes from "./presentation/routes/cart.routes.js"

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());

// 🔥 registrás rutas
app.use("/products", productRoutes); //se crea como blueprint
app.use("/categories", categoryRoutes);
app.use("/users", userRoutes);
app.use('/carts', cartRoutes)

app.listen(port, () => {
  console.log(`Servidor backend escuchando en http://localhost:${port}`);
});

export default app;