import type { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import type { UserRequest } from "../types/request.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const authenticate = (req: UserRequest, res: Response, next: NextFunction) => {
  const token = req.cookies["access-token"];
  if (!token) return res.redirect("/login");

  const decoded = jwt.verify(token, "secret");
  if (!decoded)
    return res.sendFile(path.join(__dirname, "../../public", "error/401.html"));

  req.user = decoded as jwt.JwtPayload;
  return next();
};

export default authenticate;
