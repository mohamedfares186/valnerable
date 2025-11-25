import sqlite3 from "sqlite3";
import { logger } from "../middleware/logger.js";

export const db = new sqlite3.Database("database/dev.sqlite3", (err) => {
  if (err) {
    logger.error(`Error connecting to the Database: ${err}`);
  } else {
    logger.info(`Database connected successfully`);
  }
});

db.serialize(() => {
  db.run(
    `
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      username TEXT NOT NULL,
      email TEXT NOT NULL,
      password TEXT NOT NULL
    )
  `,
    (err) => {
      if (err) {
        logger.error(`Error creating users table: ${err}`);
      } else {
        logger.info(`Database has been set successfully`);
      }
    }
  );
});

export default db;
