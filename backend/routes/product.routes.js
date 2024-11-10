import { Router } from "express";
import {
  CreateProduct,
  DeleteProduct,
  getAllProducts,
  UpdateProducts,
} from "../controllers/product.controller.js";
const router = Router();

// Get all Create products route
router.route("/").get(getAllProducts).post(CreateProduct);

// delete and Update the product
router.route("/:id").delete(DeleteProduct).put(UpdateProducts);
export default router;
