import pool from "../config/db.js";
import { logger } from "../middleware/logger.js";

await pool.query(`
	CREATE TABLE IF NOT EXISTS contact_messages (
		message_id SERIAL PRIMARY KEY NOT NULL,
		email VARCHAR(50) NOT NULL,
		message TEXT NOT NULL
	);
`);

export const createMessage = async (email: string, message: string) => {
  try {
    const result = await pool.query(
      `INSERT INTO contact_messages (email, message) VALUES ('${email}', '${message}') RETURNING *;`
    );
    return result.rows[0];
  } catch (error) {
    logger.error("Error creating message:", error);
    return error;
  }
};
