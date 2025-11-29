import express, {
  type ErrorRequestHandler,
  type NextFunction,
  type Request,
  type RequestHandler,
  type Response,
} from "express";
import cookieParser from "cookie-parser";
import requestLogger from "./middleware/logger.js";
import error from "./middleware/error.js";

import main from "./controllers/main.js";
import auth from "./controllers/auth.js";
import admin from "./controllers/admin.js";
import user from "./controllers/user.js";
import products from "./controllers/products.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../public")));
app.use(cookieParser());
app.use(requestLogger as RequestHandler);

app.use("/", auth);
app.use("/", main);
app.use("/admin", admin);
app.use("/user", user);
app.use("/api/v1", products);

// eslint-disable-next-line
app.use((req: Request, res: Response, next: NextFunction) => {
  return res
    .status(404)
    .sendFile(path.join(__dirname, "../public", "error/404.html"));
});

app.use(error as ErrorRequestHandler);

export default app;
