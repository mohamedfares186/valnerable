import { Router } from "express";
import path from "path";
import { fileURLToPath } from "url";
import db from "../config/db.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = Router();

router.get("/login", (req, res) => {
  return res.sendFile(path.join(__dirname, "../../public", "auth/login.html"));
});

router.post("/login/user", (req, res) => {
  const { username, password } = req.body;

  // VULNERABLE: SQL Injection
  const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;

  db.get(query, (err, row) => {
    if (err) {
      return res.status(500).json({ message: "Database error" });
    } else if (row) {
      return res.redirect("/");
    } else {
      return res.redirect("/login");
    }
  });
});

router.get("/register", (req, res) => {
  return res.sendFile(
    path.join(__dirname, "../../public", "auth/register.html")
  );
});

router.post("/register/user", (req, res) => {
  const { name, email, username, password } = req.body;

  // VULNERABLE: SQL Injection
  const query = `INSERT INTO users (name, email, username, password) VALUES ('${name}', '${email}', '${username}', '${password}')`;

  db.run(query, function (err) {
    if (err) {
      return res
        .status(500)
        .json({ message: "Database error", error: err.message });
    }
    return res.redirect("/login");
  });
});

export default router;
