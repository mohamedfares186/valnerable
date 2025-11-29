import { Router, type Request, type Response } from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createMessage } from "../models/messages.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = Router();

router.get("/robots.txt", (req: Request, res: Response) => {
  return res.status(200).sendFile(path.join(__dirname, "../../", "robots.txt"));
});

router.get("/", (req: Request, res: Response) => {
  return res
    .status(200)
    .sendFile(path.join(__dirname, "../../public", "index.html"));
});

router.get("/about", (req: Request, res: Response) => {
  return res
    .status(200)
    .sendFile(path.join(__dirname, "../../public", "about.html"));
});

router.get("/shop", (req: Request, res: Response) => {
  return res.sendFile(path.join(__dirname, "../../public", "shop.html"));
});

router.get("/product", (req: Request, res: Response) => {
  return res
    .status(200)
    .sendFile(path.join(__dirname, "../../public", "product.html"));
});

router.get("/contact", (req: Request, res: Response) => {
  return res
    .status(200)
    .sendFile(path.join(__dirname, "../../public", "contact.html"));
});

router.get("/api/v1/contact/response", async (req: Request, res: Response) => {
  const { email, message } = req.query;

  if (!email || email === undefined || !message || message === undefined)
    return res.status(400).json({ message: "All fields are required" });

  const sendMessage = await createMessage(email as string, message as string);
  if (!sendMessage)
    return res.status(500).json({ message: "Failed to send message" });

  return res.status(200).json({
    message: `Thanks for contacting us. We recieved your message ${message} successfully and we will get back to you soon!`,
  });
});

export default router;
