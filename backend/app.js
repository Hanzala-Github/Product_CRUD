import express from "express";
import ProductRouter from "./routes/product.routes.js";
import path from "path";
const app = express();

app.use(express.json());
const __dirname = path.resolve();

// product routes
app.use("/api/v1/products", ProductRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

// export app
export { app };
