import express from "express";
import { createProduct, updateProduct, getProducts } from "../controllers/productController.js";

const router = express.Router();

router.post("/products", createProduct);
router.put("/products/:id", updateProduct);
router.get("/products", getProducts);

export default router;
