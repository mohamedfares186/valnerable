import { Router, type Response } from "express";
import path from "path";
import { fileURLToPath } from "url";
import authenticate from "../middleware/isAuthenticated.js";
import type { UserRequest } from "../types/request.js";

const router = Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

router.get("/dashboard", authenticate, (req: UserRequest, res: Response) => {
  return res.sendFile(
    path.join(__dirname, "../../public", "user/dashboard.html")
  );
});

router.get("/cart", authenticate, (req: UserRequest, res: Response) => {
  return res.sendFile(path.join(__dirname, "../../public", "user/cart.html"));
});

export default router;
