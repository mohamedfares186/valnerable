import express, {
  type ErrorRequestHandler,
  type RequestHandler,
} from "express";
import requestLogger from "./middleware/logger.js";
import error from "./middleware/error.js";

import main from "./controllers/main.controller.js";
import auth from "./controllers/auth.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger as RequestHandler);
app.use(express.static(path.join(__dirname, "../public")));

app.use("/", main);
app.use("/", auth);

app.use(error as ErrorRequestHandler);

export default app;
