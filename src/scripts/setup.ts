import { UserTable, UserSeq } from "../models/users.js";
import { MessagesTable } from "../models/messages.js";
import { logger } from "../middleware/logger.js";
import pool from "../config/db.js";
import { ProductsTable } from "../models/products.js";

export const setupDatabase = async () => {
  try {
    await UserTable();
    await UserSeq();
    await MessagesTable();
    await ProductsTable();
    logger.info("Database setup completed successfully.");
  } catch (error) {
    logger.error("Error setting up the database:", error);
  }
};

export const createAdminUser = async () => {
  try {
    await pool.query(
      `INSERT INTO users (name, email, username, password, role) VALUES ('admin', 'admin@example.com', 'admin', 'p@ssw0rd', 'admin')`
    );
    logger.info(`Admin user has been created successfully`);
  } catch (error) {
    logger.error("Error creating admin user:", error);
  }
};

await setupDatabase();
await createAdminUser();
