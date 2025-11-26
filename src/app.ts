import express, {
  type ErrorRequestHandler,
  type RequestHandler,
} from "express";
import cookieParser from "cookie-parser";
import requestLogger from "./middleware/logger.js";
import error from "./middleware/error.js";

import main from "./controllers/main.js";
import auth from "./controllers/auth.js";
import admin from "./controllers/admin.js";
import user from "./controllers/user.js";
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

app.use(error as ErrorRequestHandler);

export default app;
