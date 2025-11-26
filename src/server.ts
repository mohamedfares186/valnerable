import app from "./app.js";
import { logger } from "./middleware/logger.js";

const port: number = (process.env.PORT as unknown as number) || 5000;

app.listen(port, "0.0.0.0", () =>
  logger.info(`Server is running on port: ${port}`)
);
