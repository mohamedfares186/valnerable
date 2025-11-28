import { Router } from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createMessage } from "../models/messages.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = Router();

router.get("/robots.txt", (req, res) => {
  return res.sendFile(path.join(__dirname, "../../", "robots.txt"));
});

router.get("/", (req, res) => {
  return res.sendFile(path.join(__dirname, "../../public", "index.html"));
});

router.post("/search", (req, res) => {
  const { search } = req.body;
  return res.send(`${search} is not found`);
});

router.get("/contact", (req, res) => {
  return res.sendFile(path.join(__dirname, "../../public", "contact.html"));
});

router.get("/contact/message", async (req, res) => {
  const { email, message } = req.query;

  if (!email || email === undefined || !message || message === undefined)
    return res.send(`
      <h1>All feilds are required</h1>
    `);

  console.log(`Error sending contact message: ${email} and ${message}`);

  const sendMessage = await createMessage(email as string, message as string);
  if (!sendMessage)
    return res.send(`Something went wrong, please try again later`);

  console.log(`Error sending contact message: ${email} and ${message}`);

  return res.send(
    `
    <h1>Thanks for contacting us.</h1> 
    
    <p>${email}Your message:</p>
    <p>${message}</p>
    
    <p>We have received your message and we will review it and get back to you as soon as possible.</p>
  `
  );
});

export default router;
