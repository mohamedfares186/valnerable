import { Router, type Request, type Response } from "express";
import path from "path";
import { fileURLToPath } from "url";
import authenticate from "../middleware/isAuthenticated.js";
import authorize from "../middleware/isAuthorized.js";
import { createProduct, getAllProducts } from "../models/products.js";

const router = Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

router.get("/login", (req, res) => {
  return res.sendFile(
    path.join(__dirname, "../../public", "admin/admin_login.html")
  );
});

router.get("/dashboard", authenticate, authorize("admin"), (req, res) => {
  return res.sendFile(path.join(__dirname, "../../public", "admin/admin.html"));
});

router.get(
  "/create-product",
  authenticate,
  authorize("admin"),
  async (req, res) => {
    const { product_name, product_description, category, price, stock } =
      req.query;
    if (
      !product_name ||
      !product_description ||
      !category ||
      !price ||
      !stock
    ) {
      return res.status(400).send("All fields are required");
    }

    const newProduct = await createProduct({
      product_name: product_name as string,
      product_description: product_description as string,
      category: category as string,
      price: price as unknown as number,
      stock: stock as unknown as number,
    });
    if (!newProduct) {
      return res
        .status(500)
        .sendFile(path.join(__dirname, "../../public", "error/500.html"));
    }

    return res
      .status(201)
      .send(`Product ${newProduct.product_name} created successfully`);
  }
);

router.get("/products", async (req: Request, res: Response) => {
  const products = await getAllProducts();

  if (!products)
    return res.status(500).json({ success: false, message: "Database Error" });

  if (products.length === 0)
    return res
      .status(404)
      .json({ success: false, message: "No products to display" });

  return res
    .status(200)
    .json({ success: true, message: "Products found", result: products });
});

export default router;
