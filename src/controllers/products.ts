import { Router, type Request, type Response } from "express";
import { getAllProducts } from "../models/products.js";

const router = Router();

router.get("/products", async (req: Request, res: Response) => {
  const products = await getAllProducts();

  if (!products)
    return res.status(500).json({ success: false, message: "Database error" });

  if (products.length === 0)
    return res
      .status(404)
      .json({ success: false, message: "No products to display" });

  return res
    .status(200)
    .json({ success: true, message: "Products found", result: products });
});

export default router;
