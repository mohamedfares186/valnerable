import type { NextFunction, Response } from "express";
import type { UserRequest } from "../types/request.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const authorize = (...allowedRoles: string[]) => {
  return (req: UserRequest, res: Response, next: NextFunction) => {
    const userRole = req.user?.role;
    if (userRole && allowedRoles.includes(userRole)) {
      return next();
    } else {
      return res.sendFile(
        path.join(__dirname, "../../public", "error/403.html")
      );
    }
  };
};

export default authorize;
