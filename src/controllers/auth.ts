import { Router } from "express";
import path from "path";
import { fileURLToPath } from "url";
import {
  getUserByUsername,
  getUserByEmail,
  createUser,
} from "../models/users.js";
import jwt from "jsonwebtoken";
import authenticate from "../middleware/isAuthenticated.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = Router();

const jwtSecret = "secret";

router.get("/login", (req, res) => {
  return res.sendFile(path.join(__dirname, "../../public", "login.html"));
});

router.post("/api/v1/auth/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({ message: "All fields are required" });
    return res.redirect("/login");
  }

  const check = await getUserByUsername(username);

  if (!check) {
    res.status(401).json({ message: "Invalid Username" });
    return res.redirect("/login");
  }

  if (check.password !== password) {
    res.status(401).json({ message: "Invalid Password" });
    return res.redirect("/login");
  }

  const token = jwt.sign(
    { userId: check.user_id, role: check.role, username: check.username },
    jwtSecret
  );

  res.cookie("access-token", token, {
    httpOnly: false,
    secure: false,
  });
  return res.redirect("/");
});

router.get("/register", (req, res) => {
  return res.sendFile(path.join(__dirname, "../../public", "register.html"));
});

router.post("/api/v1/auth/register", async (req, res) => {
  const { name, email, username, password, repeatPassword } = req.body;

  if (!name || !email || !username || !password || !repeatPassword)
    return res
      .status(400)
      .json({ message: "All feilds are required" })
      .redirect("/register");

  if (password !== repeatPassword)
    return res.status(400).json({ message: "Passwords do not match" });

  const checkUsername = await getUserByUsername(username);
  if (checkUsername)
    return res.status(409).json({ message: "Username already exists" });

  const checkEmail = await getUserByEmail(email);
  if (checkEmail)
    return res.status(409).json({ message: "Email already exists" });

  const newUser = await createUser({
    name,
    email,
    username,
    password,
    role: "user",
  });

  if (!newUser)
    return res.status(500).json({ message: "Internal Server Error" });

  res.status(201);

  return res.redirect("/login");
});

router.post("/logout", authenticate, (req, res) => {
  res.clearCookie("access-token");
  return res.redirect("/");
});

export default router;
