import pool from "../config/db.js";

export const CartTable = async () => {
  return await pool.query(`
      CREATE TABLE IF NOT EXISTS cart (
        cart_id SERIAL PRIMARY KEY,
        user_id INT NOT NULL,
        items JSONb NOT NULL,
        total_quantity INT NOT NULL,
        total_amount FLOAT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users (user_id)
      );
    `);
};
