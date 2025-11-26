import { Pool } from "pg";
import { logger } from "../middleware/logger.js";

const pool = new Pool({
  host: process.env.POSTGRES_HOST || "localhost",
  user: process.env.POSTGRES_USER || "postgres",
  database: process.env.POSTGRES_DB || "vuln_app",
  password: process.env.POSTGRES_PASSWORD || "12345678",
  port: (process.env.POSTGRES_PORT as unknown as number) || 5002,
  ssl: false,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
});

pool.on("error", (error: Error) => {
  logger.error(`Error connecting to the database: ${error}`);
  process.exit(-1);
});

pool.on("connect", () => {
  logger.info("Connected to the database");
});

export default pool;
